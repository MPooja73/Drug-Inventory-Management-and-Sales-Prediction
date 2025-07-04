package com.druginventory.service;

import com.druginventory.model.Vendor;

public interface VendorService {
    Vendor getVendorFromToken(String token);
}
