from flask import Flask, render_template, request
import pandas as pd
import pickle
from datetime import datetime

app = Flask(__name__)

# Load model and data
with open("model.pkl", "rb") as f:
    model, feature_cols, target_cols, sales_data = pickle.load(f)

@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None
    selected_date = None
    is_df_prediction = False
    is_error = False

    if request.method == "POST":
        date_input = request.form["forecast_date"]
        try:
            target_date = pd.to_datetime(date_input)
            last_date = sales_data.index[-1]
            days_ahead = (target_date - last_date).days

            if days_ahead <= 0:
                prediction = "Please select a future date."
                is_error = True
            else:
                latest_sales = sales_data[-3:].copy()
                for _ in range(days_ahead):
                    input_values = latest_sales.values.flatten()[::-1]
                    X_input = pd.DataFrame([input_values], columns=feature_cols)
                    next_pred = model.predict(X_input)[0]
                    next_pred_df = pd.DataFrame([next_pred], columns=target_cols)
                    latest_sales = pd.concat([latest_sales, next_pred_df], ignore_index=True).iloc[1:]

                pred_df = pd.DataFrame([next_pred], columns=target_cols, index=[target_date])
                prediction = pred_df.T.rename(columns={target_date: "Predicted Sales"})
                selected_date = target_date.strftime("%B %d, %Y")
                is_df_prediction = True
        except Exception as e:
            prediction = f"An error occurred: {e}"
            is_error = True

    return render_template(
        "index.html",
        prediction=prediction,
        selected_date=selected_date,
        is_df_prediction=is_df_prediction,
        is_error=is_error
    )

if __name__ == "__main__":
    app.run(debug=True)
