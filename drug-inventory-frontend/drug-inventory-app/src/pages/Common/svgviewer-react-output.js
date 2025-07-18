import * as React from "react";
const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1200"
    width={1200}
    height={1200}
    style={{
      width: "100%",
      height: "100%",
      transform: "translate3d(0,0,0)",
      contentVisibility: "visible",
    }}
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path d="M0 0h1200v1200H0z" />
      </clipPath>
      <clipPath id="b">
        <path d="M0 0h1200v1200H0z" />
      </clipPath>
      <clipPath id="c">
        <path d="M0 0h400v700H0z" />
      </clipPath>
      <clipPath id="d">
        <path d="M0 0h400v600H0z" />
      </clipPath>
      <clipPath id="e">
        <path d="M0 0h700v400H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <g
        clipPath="url(#b)"
        style={{
          display: "block",
        }}
      >
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#73D4DF"
            d="M1072.113 946.998c-8.006-1.246-24.688-3.034-46.766-5.091-68.943-6.422-190.635-15.47-266.142-18.86-21.13-.949-38.647-1.455-50.37-1.336-67.034.681-456.98 6.302-528.52 30.52 0 0-138.596 36.113-20.735 43.681 15.754 1.012 31.583 2.379 47.505 3.978 103.2 10.361 210.466 30.765 328.613 31.702 51.346.407 124.659.813 198.126.643 121.664-.281 243.75-2.144 267.185-8.212 37.587-9.73 30.019-36.43 47.318-38.757 17.3-2.328 63.79-32.041 23.786-38.268"
          />
          <path
            fill="#92E2EE"
            d="M1005.379 973.405c7.699-10.5 13.462-20.999 19.969-31.498-68.944-6.423-190.636-15.471-266.143-18.861-39.952 20.986-87.749 27.267-131.981 31.147-120.323 10.111-235.589-12.133-357.933 12.134-23.192 5.351-55.023 9.143-62.205 33.562 103.2 10.362 210.466 30.766 328.613 31.703 51.345.407 124.659.813 198.125.642 54.343-11.251 111.135-8.729 166.4-12.318 39.433-3.033 79.878-12.134 105.155-46.511"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#70E8F4"
            d="M357.585 919.493c-.998 16.358-31.171 33.339-46.81-15.65s-30.149 3.703-50.452 4.116c-8.938.183-42.324-10.739-25.833-40.036 15.316-27.206-20.387 5.934-57.577-7.752-23.583-8.678-35.467-46.44-13.055-68.181 22.412-21.744 62.375-13.666 75.653 17.103 6.914 16.022 27.866-5.386 19.713-30.484-5.49-16.9 31.106-22.756 38.76.802 8.015 24.676 20.358 41.296 37.696 24.702s45.07-.168 42.93 24.257 29.016 54.728 21.729 62.104-30.636 35.797-42.754 29.019"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M177.817 818.004s149.086 27.891 214.575 69.985"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M191.635 798.888s16.537 7.427 23.873 26.613m-16.252 19.414c.748-.133 21.377 5.894 36.135-14.008m46.896-48.207s39.35 40.903 33.785 70.44m-60.666 34.291s40.133-8.66 51.686-35.978m47.338 16.954s-7.716-37.638-25.008-48.345"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M344.478 841.005s19.07-13.22 14.582-26.777m-38.562 90.636s31.083 17.985 59.676-23.775"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M323.677 884.277s17.182 21.838 29.408 20.944M273.197 799.32c.344.633 24.273 28.105 34.778 20.763m-53.265 43.396s22.683-.01 33.94 8.643"
            fill="none"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#76E9F4"
            d="M810.922 480.401c-13.875-8.721-14.303-43.342 36.184-33.567 50.488 9.773 13.896-27.072 20.587-46.244 6.624-18.988 36.03-38.778 47.519-3.466 9.66 29.69 10.423-14.693 34.42-46.804 15.042-20.13 63.016-26.305 71.345 3.789 8.328 30.094-17.92 51.76-49.417 63.204-28.908 10.504-11.892 45.583 13.422 38.129 20.412-6.012 3.047 54.486-22.555 39.85-22.525-12.877-46.002-1.943-39.756 21.228 6.244 23.172-17.413 31.042-37.82 17.45-20.406-13.594-65.994 7.798-68.972-2.134s-16.718-44.053-4.957-51.435"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M986.197 371.337s-95.98 117.44-164.327 154.717"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M996.344 392.631s-14.448 10.949-34.803 8.185m-9.239-23.574c-.242.72-15.425 15.931-5.04 38.428m22.221 55.074s-57.178 24.107-80.427 5.057m6.781-78.021s-22.57 48.058-.994 70.95m-37.581 33.403s36.726 11.283 54.416 1.245"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M885.792 507.298s-.298 8.917 13.75 11.482m-57.995-63.906s-30.69 18.648-7.76 63.767"
            fill="none"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#FDFDFD"
            strokeWidth={2.2}
            d="M858.086 467.538s-27.404 4.603-32.482 15.76m108.337-18.912c-.721-.003-12.925 7.394-11.763 18.206m-22.768-58.217s.024 12.41-12.969 18.136"
            fill="none"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#065A5E"
            d="m666.126 395.677-179.738 81.939a11.7 11.7 0 0 0-6.85 10.649v277.338c0 3.258 1.36 6.37 3.75 8.584L663.027 940.71a11.7 11.7 0 0 0 15.906 0L858.67 774.187a11.7 11.7 0 0 0 3.75-8.584V488.265c0-4.585-2.678-8.747-6.85-10.65l-179.737-81.938a11.7 11.7 0 0 0-9.707 0"
          />
          <path
            fill="#FDFDFD"
            d="m652.342 395.677-179.737 81.939a11.7 11.7 0 0 0-6.85 10.649v277.338c0 3.258 1.36 6.37 3.75 8.584L649.242 940.71a11.7 11.7 0 0 0 15.907 0l179.737-166.523a11.7 11.7 0 0 0 3.75-8.584V488.265c0-4.585-2.677-8.747-6.85-10.65L662.05 395.678a11.7 11.7 0 0 0-9.708 0"
          />
          <path
            fill="#1D396B"
            d="m653.243 446.406-146.407 66.743a9.54 9.54 0 0 0-5.578 8.674v225.906a9.53 9.53 0 0 0 3.054 6.993l146.405 135.642a9.535 9.535 0 0 0 12.959 0L810.08 754.722a9.53 9.53 0 0 0 3.052-6.993V521.823a9.54 9.54 0 0 0-5.578-8.674L661.15 446.406a9.54 9.54 0 0 0-7.907 0"
          />
          <path
            fill="#92E2EE"
            d="m658.351 454.687-141.728 65.505c-3.29 1.52-5.4 4.848-5.4 8.512v221.718a9.4 9.4 0 0 0 2.957 6.862L655.908 890.41a9.134 9.134 0 0 0 12.543 0L810.18 757.284a9.4 9.4 0 0 0 2.954-6.862V528.704c0-3.664-2.109-6.992-5.397-8.512l-141.73-65.505a9.11 9.11 0 0 0-7.655 0"
          />
        </g>
        <path
          fill="#E65E75"
          d="m121.25-41.481-78.946-.323-1.321-75.45h-79.29l.178 76.949-81.943-.177-.178 80.787h80.945l-.176 86.938 81.055-1.786-.023-84.94 79.642.288z"
          transform="matrix(.98 0 0 .98 657.196 625.752)"
          opacity={0.031}
          style={{
            display: "block",
          }}
        />
        <path
          fill="#E65E75"
          d="M104.855-23.411H23.412v-81.444h-46.823v81.444h-81.444v46.823h81.444v81.443h46.823V23.412h81.443z"
          transform="matrix(.98 0 0 .98 657.196 625.752)"
          style={{
            display: "block",
          }}
        />
      </g>
      <g
        clipPath="url(#c)"
        transform="translate(719 362)"
        style={{
          display: "block",
        }}
      >
        <path
          d="M-35.101 17.947s-.347-9.144 9.807-10.95C-15.141 5.189 1.692-1.438 1.692-1.438l.98-20.305 19.594 2.53 2.316 15.724s3.741-1.265 4.453 2.35 6.413 18.797 3.029 19.521c-3.385.722-20.681.836-21.154.04-.472-.798-.267-2.508-.267-2.508s-31.255 4.888-32.865 5.015c-10.354.814-12.879-2.982-12.879-2.982"
          transform="translate(195.024 591.439)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#162C51"
          d="M-21.154-55.348c-.15 64.347-.143 128.441.473 130.583 1.247 4.338 38.298 2.531 38.298 2.531l3.687-133.433c-1.962-23.906-39.923-20.248-42.458.319"
          transform="rotate(-2.993 9823.868 -3723.85)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#162C51"
          d="M-22.653-76.051s-.319 66.242-.473 132.218c3.456 22.951 37.868 25.306 42.397 1.897l3.855-139.537z"
          transform="rotate(5.986 -3692.5 2233.777)"
          style={{
            display: "block",
          }}
        />
        <path
          d="M-18.529 14.68s2.221 1.092 18.18 1.914c16.579.854 16.779.315 16.779.315s3.096-1.161 3.711-3.206c.434-1.446 2.583-8.314-2.94-10.664C11.925.794 9.537-1.232 9.537-1.232s-.399-4.864-1.198-4.864-2.396-.508-2.396-.508l-.601-10.844-23.472 1.013.299 11.25-2.096.711s-2.797 18.039 1.398 19.154"
          transform="translate(274.636 598.62)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#162C51"
          d="M16.783-61.075c-7.551-18.336-38.571-15.791-41.561 5.873 5.048 51.11 9.693 99.715 10.011 108.587.713 19.882 2.494 23.135 12.113 24.22s27.432 1.806 27.076-4.338c-.188-3.229-4.112-69.817-7.639-134.342"
          transform="rotate(-1.99 14743.504 -7243.9)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#162C51"
          d="M26.835 53.195c-3.187-58.292-6.05-114.899-5.543-121.591 1.069-14.097 3.206-9.037-6.769-9.037s-42.836 1.455-42.395 5.783c0 0 6.882 67.289 13.145 130.718 5.934 23.424 43.041 20.908 41.562-5.873"
          transform="rotate(6.981 -3098.11 2282.389)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#5073D1"
            d="m202.86 159.957 24.496-8.64s18.978-3.678 21.901-3.169 27.645 12.224 29.973 14.475-6.585 146.532-7.823 151.373-52.384 7.123-61.425 5.723-21.726-5.643-22.5-6.482c-.771-.841 7.244-146.24 10.295-149.388s5.083-3.892 5.083-3.892"
          />
          <path
            fill="#91B8EB"
            d="m222.011 311.498-.556 15.93 15.867.553.57-16.36z"
          />
          <path
            fill="#FDFDFD"
            d="m223.77 313.34-.428 12.27 12.223.427.44-12.6z"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFF"
            d="M286.278 291.469c-.141-4.885-.177-9.11-.076-12.426.15-4.921.356-11.25.595-18.38h.004l.15-4.429c.837-13.099 2.493-46.172 2.213-61.94-.011.014-.024.043-.036.058.542-15.025.932-25.712.932-25.712l-30.13-17.67s3.13 4.153 3.317 6.466c.187 2.312-18.358 52.987-20.978 56.513-.635.855-1.171 13.543-1.577 32.298.128.049.26.103.387.154-.32 1.644-1.029 13.89-1.13 21.118-.032.586-.256 155.026 1.744 157.013 4.097 1.364 52.795-11.268 53.19-12.34.35-.953-7.492-81.934-8.605-120.723"
          />
          <path
            fill="#7979CC"
            d="m256.953 225.597.1 2.233 13.342.733.27-2.576z"
          />
          <path
            fill="#B9B3B6"
            d="M286.202 279.043c.152-4.978.36-11.396.603-18.627-.049-.002 2.678-48.194 2.36-66.121-2.208 2.807-12.78 41.657-14.442 46.078-2.213 5.882-2.913 9.946-5.957 19.634a8.86 8.86 0 0 0 .588 6.778c4.469 8.495 15.505 24.576 16.923 24.684-.141-4.885-.176-9.11-.075-12.426M273.918 160.86l-2.438 26.566-7.822 2.257 5.828.787s-16.201 28.614-19.428 29.085-3.607.555-3.607.555 4.24.245 4.816-.026 19.592-30.102 19.592-30.102l-3.422-.374 5.133-1.973z"
          />
          <path
            fill="#D7D3D5"
            d="M252.503 351.22s-.076 32.553 5.697 32.755 25.267-.674 25.423-1.746-1.479-32.847-3.488-33.995-28.255.57-27.632 2.985"
          />
          <path
            fill="#FFF"
            d="M253.338 350.92s-.057 30.01 5.336 30.199c5.391.188 23.598-.612 23.744-1.6.144-.988-1.398-30.28-3.275-31.34-1.876-1.058-26.388.513-25.805 2.741"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFF"
            d="M229.685 149s-27.65 5.49-35.297 11.917c-7.6 7.55-7.985 23.144-9.075 37.219-4.6 59.462-8.603 180.53-18.574 209.68 15.707 9.59 43.585 17.434 43.585 17.434s11.809-92.969 10.379-113.275c-1.431-20.305 6.125-93.83 6.125-93.83s-6.365-21.924-5.772-38.904 3.758-26.64 8.63-30.24"
          />
          <path
            fill="#B9B3B6"
            d="m212.909 158.13-7.053 29.73 9.82 2.107-8.417 3.64s11.35 25.942 12.534 26.48 5.71-.208 5.806-.386-4.43.525-5.2-.362c-.772-.886-11.369-24.755-10.892-25.01s8.54-4.686 8.54-4.686l-8.76-3.018zm-34.067 152.906s2.943-40.19 4.302-59.272c0 0 1.085-51.782 3.066-63.641 1.893 8.91 10.992 106.122 8.916 113.284s-13.085 19.009-13.085 19.009l-3.966 5.431z"
          />
          <path
            fill="#D7D3D5"
            d="M212.376 353.28s-1.964 29.059-7.129 28.879-22.51-2.178-22.582-3.144 3.37-29.224 5.234-30.122 25.184 2.27 24.477 4.388"
          />
          <path
            fill="#FFF"
            d="M211.65 352.961s-1.822 26.788-6.646 26.62c-4.825-.169-20.007.21-21.514-2.236-.467-.759 3.555-27.612 5.297-28.44s23.522 2.105 22.862 4.056"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFB8B6"
            d="m231.82 142.181-2.632 25.613s10.584 10.814 15.59 10.355c5.008-.457 11.111-11.91 11.111-11.91s-2.045-20.6-1.808-27.372-22.261 3.314-22.261 3.314"
          />
          <path
            fill="#477CB7"
            d="M229.58 148.886s-9.164 4.021-5.662 16.69 5.801 17.632 5.801 17.632 5.774-10.31 11.758-11.323c-6.112-2.993-14.51-14.394-10.527-21.24.066-.643.288-1.7.187-2.164-.026-.119-1.557.405-1.557.405"
          />
          <path
            fill="#477CB7"
            d="M240.504 172.936s5.991 4.55 7.017 10.915c8.403-5.855 14.278-21.312 14.645-22.655.151-.553.97-2.03 1.002-3.72.043-2.223-2.961-6.085-3.314-6.587-.133-.19-5.323-1.571-5.39-1.61 0 0 1.886 17.767-13.96 23.657"
          />
          <path
            fill="#6E174D"
            d="m230.902 176.128 3.848 16.14s-13.294 64.282-13.63 68.792 3.012 36.275 5.149 36.35 12.762-33.736 12.639-40.432-.05-64.929-.05-64.929l8.661-13.26-5.342-5.251-5.34-.187z"
          />
        </g>
        <path
          fill="#5DABFF"
          d="M0-20.289S-10.688-3.53-8.55 4.151-2.672 19.425 0 20.148c2.672.722 6.146-3.977 4.631-11.026s-.712-10.573 0-11.115C5.344-2.536 6.324.176 5.7 1.893c-.623 1.716-.089 3.885 1.069 3.343s3.465-11.5 3.919-15.996C11.717-20.948 1.336-20.871 0-20.289"
          transform="rotate(87.099 -68.55 123.193)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#FBF9FA"
          d="M-20.543 33.251s5.895 10.33 17.17 8.907c11.276-1.422 27.2-71.804 26.074-78.936-.833-5.275-8.764-13.266-17.599-11.372-6.763 1.45-9.883 8.1-12.042 14.664-1.928 5.859-16.902 62.698-13.603 66.737"
          transform="rotate(103.063 -29.758 146.64)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FCFAFB"
            d="M207.389 167.334c2.766 7.336-2.8 17.362-25.973 40.42-23.613 23.492-30.447 33.46-39.8 33.077s-15.84-13.217-11.02-20.183c4.823-6.968 49.83-50.475 56.367-54.889 9.42-6.357 17.66-5.76 20.426 1.575"
          />
          <g transform="rotate(41.93 883.544 -116.535)" />
        </g>
        <path
          fill="#5DABFF"
          d="M26.544 8.8S17.05 3.698 18.215.87c2.882-6.999-2.963-17.055-6.322-13.977 0 0-2.095-12.056-12.231-10.608-26.206 3.744-13.479 26.563-9.734 31.241 3.746 4.677 22.093 19.387 22.093 19.387s9.916-3.75 12.39-6.621S26.544 8.8 26.544 8.8"
          transform="rotate(-26.565 642.593 -329.37)scale(.59864)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#FBF9FA"
          d="M-34.292-16.182s-7.481 4.582-5.7 15.969c1.781 11.386 61.966 19.542 66.28 19.538 5.694-.005 11.938-2.991 13.41-9.787C41.187 2.664 29.694-5.281 23.881-6.789c-5.885-1.526-54.305-12.874-58.173-9.393"
          transform="rotate(-6.167 2543.49 -2304.948)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#FBF9FA"
          d="M-9.201-54.569c-9.013.681-10.151 11.626-6.945 44.159 3.206 32.535 2.482 56.013 10.004 61.583 9.191 6.806 20.775.91 21.844-7.495s-5.695-77.709-8.635-85.029C4.129-48.672-.188-55.25-9.201-54.569"
          transform="rotate(2.951 -4165.328 5739.211)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFF"
            d="M262.3 204.736c-2.55.044-4.66-2.028-4.706-4.62s1.991-4.738 4.54-4.783 4.661 2.028 4.706 4.62-1.991 4.738-4.54 4.783"
          />
          <path d="M262.146 196.052c2.153-.037 3.935 1.72 3.973 3.914s-1.68 4.012-3.833 4.05-3.934-1.718-3.972-3.913c-.039-2.195 1.68-4.013 3.832-4.05m-.025-1.44c-2.95.051-5.3 2.521-5.248 5.515s2.487 5.38 5.438 5.328 5.302-2.52 5.25-5.515-2.488-5.38-5.44-5.329" />
          <path
            strokeMiterlimit={10}
            stroke="#000"
            strokeWidth={1.44}
            d="M208.48 229.355s-.507-22.999.168-26.034c.91-4.084 7.225-9.617 14.207-2.598 4.677 7.6 2.69 26.436 2.69 26.436"
            fill="none"
          />
          <path
            fill="#1A1A1A"
            d="M211.94 230.442c.03 1.761-1.487 3.216-3.389 3.25-1.902.032-3.469-1.368-3.5-3.13-.03-1.759 1.486-3.213 3.389-3.246s3.47 1.367 3.5 3.126m17.576-2.873c.03 1.76-1.487 3.215-3.39 3.248-1.902.034-3.469-1.367-3.5-3.128-.03-1.76 1.487-3.213 3.39-3.247s3.469 1.367 3.5 3.127"
          />
          <path
            strokeMiterlimit={10}
            stroke="#000"
            strokeWidth={1.691}
            d="M216.917 197.424s-2.868-53.247 20.74-54.905c17.533-1.23 23.047 5.05 25.047 16.918 2.597 15.406.536 36.156.536 36.156"
            fill="none"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFB8B6"
            d="M227.972 95.234s-13.162 46.452 7.315 53.725 28.99-19.562 29.031-19.952 6.584-25.722 2.202-32.096c-4.383-6.372-26.473-18.02-38.548-1.677"
          />
          <path
            strokeMiterlimit={10}
            stroke="#221F1F"
            strokeWidth={1.34}
            d="M240.106 118.392c-.225 2.14-1.29 4.208-3.105 4.987-1.19.51-2.557.465-4.052.308-1.634-.171-3.131-.293-4.17-1.42a6.68 6.68 0 0 1-1.732-5.245 6.68 6.68 0 0 1 3.937-5.427c1.002-.44 5.239-.07 6.052.439a6.67 6.67 0 0 1 3.07 6.358zm16.874 1.77c-.225 2.14-1.29 4.208-3.106 4.987-1.189.51-2.557.465-4.051.308-1.634-.172-3.132-.293-4.17-1.42a6.68 6.68 0 0 1-1.732-5.245 6.68 6.68 0 0 1 3.936-5.427c1.003-.44 5.238-.07 6.05.438a6.67 6.67 0 0 1 3.072 6.359z"
            fill="none"
          />
          <path
            strokeMiterlimit={10}
            stroke="#221F1F"
            strokeWidth={1.34}
            d="M239.612 115.61s2.181-1.505 5.113.62m12.452 2.042 2.125.223c1.655.173 7.653-2.504 7.653-2.504m-39.663-1.292s-2.829-.056-3.772-.072c-.625-.011 1.024-1.53 1.024-1.53"
            fill="none"
          />
          <path
            fill="#FAF4FA"
            d="M222.127 127.911s15.055-1.946 17.014-4.895c0 0 3.448-1.379 5.154.87 1.707 2.249 13.797 8.498 18.567 8.298-.269 3.388-8.993 22.36-21.956 20.826-12.963-1.535-17.011-17.434-17.296-19.17-.297-1.817-1.483-5.929-1.483-5.929"
          />
          <path d="M223.134 118.306s1.549 2.509 1.768-4.569c.238-7.629.394-8.82 3.705-9.48s6.962-5.642 8.368-12.648c7.272 10.6 21.379 14.651 26.786 15.33 1.068 10.061.353 19.185.924 20.49.863 1.969 3.83-4.512 4.78-6.09.946-1.577 5.012-20.654 4.655-26.84s-11.115-14.468-19.303-16.333-30.09-1.925-32.405 14.823c-2.316 16.747-.937 25.143.722 25.317" />
        </g>
      </g>
      <g
        clipPath="url(#d)"
        transform="matrix(-1 0 0 1 560 396)"
        style={{
          display: "block",
        }}
      >
        <path
          fill="#FFB8B6"
          d="M-5.585 6.085c.626 1.494-.743 11.494 1.538 11.857 3.046.485 2.039-8.73 3.019-8.67 1.612.098 2.961-.213 4.082-.597C5.209 7.622 5.551 5.509 6.06 3.293c1.862.387 1.296-3.387.694-4.395C4.96-2.821 3.527-4.905 1.965-6.827-7.922-9.923-7.753.907-5.585 6.085"
          transform="rotate(154.865 37.315 60.201)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#85C2F8"
          d="M-8.055-25.418s-2.102 58.271 0 60.533 7.881 1.447 10.683.542c2.102-2.804 6.042-57.886 6.48-61.104 1.05-7.711-16.785-11.93-17.163.029"
          transform="rotate(158.908 41.909 78.444)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#85C2F8"
          d="M6.973-37.016C.742-38.408-4.825-35.77-8.32-23.049c-2.435 8.858-5.342 33.419-4.816 50.791-.005 8.002 15.726 9.267 17.338-.21 2.39-14.055 5.332-32.27 5.332-32.27s6.733-27.647-2.561-32.278"
          transform="rotate(71.957 -33.35 178.274)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#F0EEEF"
            d="M167.3 519.878c.193 5.56-17.112 25.586-17.112 25.586s6.875 4.92 8.843 4.852 18.504-12.055 20.458-16.333 1.827-19.211 1.827-19.211-14.21-.455-14.017 5.106"
          />
          <path
            fill="#2955B1"
            d="m182.976 517.156 1.378 39.473-5.673-.616-1.878-8.627-8.657 8.043s-24.818.596-24.832.189-3.729-5.166-2.58-6.157 10.333-5.64 9.636-6.312c-.288-.278 11.019 3.145 15.687 1.353s13.357-23.961 13.243-27.217 3.676-.129 3.676-.129"
          />
        </g>
        <path
          fill="#5DABFF"
          d="M-17.692-40.804c1.308 17.623 2.08 32.508 2.08 37.597 0 10.857 2 64.061 2 64.061l26.466 2.636S16.45 4.049 17.692-42.456c-1.06-21.034-34.535-18.963-35.384 1.652"
          transform="rotate(2 -13049.595 5293.291)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#5DABFF"
            d="M195.047 420.262c2.77-13.583 5.138-26.074 6.61-35.608.673-4.363 3.469-19.134 3.86-20.753 7.112-29.44 10.715-57.988 7.023-59.741s-34.381-7.9-38.424 2.597c0 0-3.593 6.707-6.445 19.667-1.662 7.554-3.074 17.23-3.373 28.95-.43 16.914-2.374 40.434-4.385 60.37-1.654 22.228 31.059 23.787 35.134 4.518"
          />
          <path
            fill="#127AC8"
            d="M212.54 304.159c-3.69-1.754-34.38-7.9-38.424 2.596 0 0-3.593 6.708-6.445 19.67 9.25 3.868 20.773 5.376 29.609 1.34-2.826 16.024 3.947 32.528 6.033 47.52 1.259-5.816 2.081-10.706 2.434-12.336 6.84-31.717 10.485-57.037 6.794-58.79"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#2955B1"
            d="M226.096 516.088s-5.954 41.44 3.502 43.612c9.457 2.172 15.762 0 15.762 0s4.729-16.83-1.926-42.165z"
          />
          <path
            fill="#F0EEEF"
            d="M227.496 519.48s-3.021 28.638 2.89 29.181 13.003-.679 13.003-.679 1.576-20.766-2.101-28.502-13.792 0-13.792 0"
          />
        </g>
        <path
          fill="#5DABFF"
          d="M-17.714-41.168C-14.571 2.335-10.42 64.781-10.42 64.781h23.643S15.641-.454 17.714-43.872C14.16-64.611-17.714-64.78-17.714-41.168"
          transform="translate(235.551 457.55)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#5DABFF"
            d="M257.889 336.942c-.144-20.269-3.073-27.427-3.073-27.427-.379-5.914-42.292-10.042-45.445-5.156-1.476 2.289-1.774 8.829-1.172 18.333.683 10.785 2.523 25.388 5.112 41.929 1.151 7.357 2.329 21.348 4.526 51.761 5.588 19.462 33.231 17.807 35.428-2.704 1.339-28.054 2.372-38.185 3.056-45.34 1.23-12.877 1.626-23.202 1.568-31.396"
          />
          <path
            fill="#127AC8"
            d="M209.371 304.358c-1.477 2.289-1.773 8.829-1.171 18.333 3.288-.243 6.754-.812 9.607 1.153 11.708 6.452 26.307 12.475 40.081 13.098-.144-20.27-3.071-27.427-3.071-27.427-.38-5.914-42.294-10.043-45.446-5.157"
          />
        </g>
        <path
          d="M-21.483 32.774c1.724 1.127 40.631 4.742 41.155 1.876s8.642-35.437 2.9-52.464S6.138-37.516-2.079-36.624c-8.217.891-26.235 4.752-24.75 27.422s2.772 40.293 5.346 41.976"
          transform="rotate(-2.998 1938.865 -3779.592)scale(.9025)"
          style={{
            display: "block",
          }}
        />
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#5DABFF"
            d="m236.163 204.185-.036-.335a213 213 0 0 1-.366-3.737c-2.234-25.538 14.686-42.338-3.082-59.558-3.382-3.277-36.71-7.689-53.542.868-7.418 3.77-4.793 12.376-7.184 21.7-3.033 11.835-9.09 24.027-6.913 33.184.15.63.868 1.428 1.868 2.303 3.15 2.758 9.165 6.298 9.57 7.87.49 1.899.667 6.31.632 12.329-.163 28.569-10.164 92.672-9.433 97.71 0 0 36.82 10.336 92.367-5.784-11.642-26.784-21.203-81.633-23.881-106.55"
          />
          <path
            fill="#3892E4"
            d="m236.162 204.184-.036-.335c-8.25 7.924-20.745 10.755-28.112 3.096-4.67-2.65 5.078-9.617 3.078-15.559-8.146 8.358-24.299 9.77-29.632-.465-1.645 7.193-8.25 7.595-14.553 7.688 3.149 2.758 9.165 6.3 9.57 7.871.49 1.899.667 6.31.632 12.328 21.512 4.023 44.164 2.36 59.053-14.624"
          />
          <path
            fill="#FFB8B6"
            d="m191.079 123.183-.897 21.907 5.298 12.343 17.97-17.648s-4.451-20.745-3.544-25.44c.909-4.694-20.798-.617-18.827 8.838"
          />
          <path
            fill="#FAF4FA"
            d="m189.693 135.473.488 9.616 5.3 12.343 17.97-17.648-1.006-7.204-14.771 10.736s-8.162-11.395-7.981-7.843m-17.261 33.117.212 2.434s10.382.047 11.465-.388l.102-2.598z"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFB8B6"
            d="M179.163 80.032s-2 42.688 14.779 46.278 24.52-28.653 24.718-36.857c.67-27.664-37.198-31.243-39.497-9.42"
          />
          <path
            fill="#FAF4FA"
            d="M179.794 106.798s9.255-6.502 17.141-6.3 18.795 6.292 18.795 6.292-1.155 20.065-17.309 20.808c-8.575.395-13.464-5.2-15.25-9.004-1.268-2.697-3.377-11.796-3.377-11.796"
          />
          <path d="M194.276 65.254s-16.81-.878-16.942 13.381.56 10.707.56 10.707 16.095-3.417 23.686-8.21c3.151-2.048 4.897-5.906 4.897-5.906s6.71 15.47 13.075 17.083c1.938-3.743-.104-14.121-1.562-17.31s-14.252-13.694-23.714-9.745" />
        </g>
        <path
          fill="#FFB8B6"
          d="M5.996-6.121s-4.65-2.275-7.049-2.376c-2.399-.102-6.951 2.831-6.461 3.388s1.566 1.113 1.566 1.113-4.626 1.366-4.038 2.353c.587.986 3.157 10.242 7.563 9.938S9.838 4.35 10.205 1.618 7.587-6.5 5.996-6.121"
          transform="rotate(24.012 -75.465 509.732)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#85C2F8"
          d="M-29.277 11.081S-.589-14.546 19.244-21.061c6.588-1.828 10.864 7.716 7.744 12.73-2.644 4.249-51.536 31.22-51.536 31.22s-5.56-7.085-4.729-11.808"
          transform="rotate(46.991 23.216 317.094)"
          style={{
            display: "block",
          }}
        />
        <path
          fill="#85C2F8"
          d="M2.201 36.235s-7.264-18.37-12.692-40.81c-5.43-22.439-8.932-32.573-2.452-36.192 6.479-3.62 12.259-1.838 17.337 12.097 5.079 13.934 13.447 59.118 13.93 62.162 1.1 6.937-13.175 10.895-16.123 2.743"
          transform="rotate(-136.988 147.374 11.322)"
          style={{
            display: "block",
          }}
        />
      </g>
      <g
        clipPath="url(#e)"
        transform="translate(314 668)"
        style={{
          display: "block",
        }}
      >
        <g
          style={{
            display: "block",
          }}
        >
          <path fill="#214784" d="M509.057 207.59h99.803v-13.387h-99.803z" />
          <path
            fill="#FCFDFF"
            d="M608.861 189.428c0-10.045-8.147-18.2-18.201-18.2h-11.04v-5.918h-39.307v5.918h-13.057c-10.054 0-18.199 8.155-18.199 18.2v4.775h99.804z"
          />
          <path
            fill="#214784"
            d="M509.058 286.22v14.242c0 10.055 8.146 18.201 18.2 18.201h63.402c10.055 0 18.201-8.146 18.201-18.201v-14.243z"
          />
          <path
            fill="#5DABFF"
            d="M608.862 189.423v111.036c0 10.054-8.146 18.2-18.2 18.2h-63.404c-10.054 0-18.2-8.146-18.2-18.2V189.423c0-10.044 8.146-18.198 18.2-18.198h13.057v-5.918h4.241v10.158h-17.298c-7.7 0-13.957 6.27-13.957 13.958v111.036c0 7.7 6.257 13.958 13.957 13.958h63.404c7.69 0 13.957-6.259 13.957-13.958V189.423c0-7.688-6.268-13.958-13.957-13.958h-15.284v-10.158h4.243v5.918h11.04c10.055 0 18.201 8.154 18.201 18.198"
          />
          <path fill="#006C71" d="M579.62 165.31h-39.307v-3.903h39.307z" />
          <path fill="#FDFDFD" d="M586.938 161.406h-53.942v-17.903h53.942z" />
          <path
            fill="#73D4DF"
            d="M608.862 189.423v111.036c0 10.054-8.146 18.2-18.2 18.2h-63.404c-10.054 0-18.2-8.146-18.2-18.2V189.423c0-10.044 8.146-18.198 18.2-18.198h13.057v-5.918h4.241v10.158h-17.298c-7.7 0-13.957 6.27-13.957 13.958v111.036c0 7.7 6.257 13.958 13.957 13.958h63.404c7.69 0 13.957-6.259 13.957-13.958V189.423c0-7.688-6.268-13.958-13.957-13.958h-15.284v-10.158h4.243v5.918h11.04c10.055 0 18.201 8.154 18.201 18.198"
          />
          <path fill="#DEDEE0" d="M608.86 207.59h-99.804v78.63h99.804z" />
          <path
            fill="#FDFDFD"
            d="M603.595 227.765h-89.272v-6.555h89.272zm-68.966 8.265h-17.455v-3.278h17.455zm38.829 6.555h-59.135v-3.277h59.135zm0 6.554h-59.135v-3.277h59.135zm-38.829 6.555h-17.455v-3.277h17.455zm38.829 6.556h-59.135v-3.279h59.135zm0 6.553h-59.135v-3.277h59.135z"
          />
          <path fill="#FFB8B6" d="M603.596 232.75h-26.933v36.053h26.933z" />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFB8B6"
            d="m620.6 320.08-27.905-3.387c-9.981-1.21-17.09-10.283-15.88-20.264l.049-.402c1.21-9.98 10.283-17.091 20.264-15.88l27.907 3.386z"
          />
          <path
            fill="#FDFDFD"
            d="m620.6 320.079 27.905 3.386c9.98 1.21 19.054-5.9 20.264-15.88l.05-.402c1.21-9.98-5.899-19.054-15.88-20.265l-27.905-3.386z"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#065A5E"
            d="m506.66 316.443-25.051 6.294c-8.961 2.252-18.05-3.187-20.301-12.148l-.091-.36c-2.252-8.96 3.187-18.05 12.148-20.3l25.051-6.295z"
          />
          <path
            fill="#FDFDFD"
            d="m506.66 316.443 25.051-6.295c8.961-2.25 14.4-11.34 12.149-20.301l-.091-.36c-2.251-8.96-11.34-14.4-20.301-12.148l-25.052 6.295z"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FFB8B6"
            d="m429.677 304.1-27.672-4.945c-9.898-1.768-16.488-11.226-14.72-21.123l.072-.398c1.768-9.898 11.227-16.488 21.124-14.719l27.671 4.944z"
          />
          <path
            fill="#FDFDFD"
            d="m429.677 304.1 27.672 4.944c9.898 1.768 19.355-4.821 21.123-14.719l.071-.399c1.769-9.897-4.821-19.354-14.719-21.122l-27.672-4.945z"
          />
        </g>
        <g
          style={{
            display: "block",
          }}
        >
          <path
            fill="#FDFDFD"
            d="M275.288 234.68c0-8.227-6.669-14.896-14.896-14.896H92.327c-8.227 0-14.895 6.669-14.895 14.896v11.534h197.856z"
          />
          <path
            fill="#CCCDD2"
            d="M275.288 246.214H77.432v6.727h197.856zM77.431 324.059h197.856v-5.766H77.431z"
          />
          <path
            fill="#FDFDFD"
            d="M275.288 252.94H77.432v65.353h197.856zM77.431 324.059v1.922c0 8.226 6.668 14.896 14.895 14.896h168.065c8.227 0 14.896-6.67 14.896-14.896v-1.922z"
          />
          <path
            fill="#162C51"
            d="M201.86 193.479h-51c-9.404 0-17.027 7.624-17.027 17.027v26.937h8.089v-26.937c0-4.934 4.013-8.938 8.938-8.938h51c4.924 0 8.938 4.004 8.938 8.938v26.937h8.089v-26.937c0-9.403-7.624-17.027-17.027-17.027"
          />
          <path
            fill="#E65E75"
            d="M202.068 277.928h-18.021v-18.02h-15.376v18.02h-18.02v15.378h18.02v18.018h15.376v-18.018h18.021z"
          />
        </g>
      </g>
    </g>
  </svg>
);
export default SVGComponent;
