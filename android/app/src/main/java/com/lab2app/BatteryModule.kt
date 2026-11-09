package com.lab2app

import android.content.Context
import android.os.BatteryManager
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BatteryModule"

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val batteryManager = reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
            val batteryLevel = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
            promise.resolve(batteryLevel)
        } catch (e: Exception) {
            promise.reject("ERR_BATTERY", "Cannot get battery level: ${e.message}", e)
        }
    }
}
