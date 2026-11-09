package com.lab2app

import android.app.Activity
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BrightnessModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BrightnessModule"

    @ReactMethod
    fun setBrightness(brightness: Double, promise: Promise) {
        val activity: Activity? = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("ERR_ACTIVITY", "Activity is not available")
            return
        }

        activity.runOnUiThread {
            try {
                val level = brightness.toFloat().coerceIn(0.01f, 1.0f)
                val layoutParams = activity.window.attributes
                layoutParams.screenBrightness = level
                activity.window.attributes = layoutParams
                if (Build.HARDWARE == "ranchu" || Build.HARDWARE == "goldfish") {
                    updateEmulatorDimming(activity, level)
                }
                promise.resolve(true)
            } catch (e: Exception) {
                promise.reject("ERR_BRIGHTNESS", "Cannot set brightness: ${e.message}", e)
            }
        }
    }

    private fun updateEmulatorDimming(activity: Activity, level: Float) {
        val content = activity.findViewById<ViewGroup>(android.R.id.content) ?: return
        val overlayTag = "emulatorBrightnessOverlay"
        val overlay = content.findViewWithTag<View>(overlayTag) ?: View(activity).apply {
            tag = overlayTag
            setBackgroundColor(Color.BLACK)
            importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_NO
            val matchParent = ViewGroup.LayoutParams.MATCH_PARENT
            content.addView(this, ViewGroup.LayoutParams(matchParent, matchParent))
        }
        // Leave enough contrast to use the slider at the lowest brightness.
        overlay.alpha = (1.0f - level) * 0.65f
    }

    @ReactMethod
    fun getBrightness(promise: Promise) {
        val activity: Activity? = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("ERR_ACTIVITY", "Activity is not available")
            return
        }

        activity.runOnUiThread {
            try {
                val current = activity.window.attributes.screenBrightness
                // Negative value means system default brightness
                val brightnessVal = if (current < 0) 0.5f else current
                promise.resolve(brightnessVal.toDouble())
            } catch (e: Exception) {
                promise.reject("ERR_BRIGHTNESS", "Cannot get brightness: ${e.message}", e)
            }
        }
    }
}
