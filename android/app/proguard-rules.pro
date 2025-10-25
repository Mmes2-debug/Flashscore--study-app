# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in [sdk]/tools/proguard/proguard-android.txt

# Keep Kids Mode and Safety classes
-keep class com.sportscentral.app.safety.** { *; }
-keep class com.sportscentral.app.kidsmode.** { *; }

# Keep model classes for API
-keep class com.sportscentral.app.models.** { *; }

# Preserve line numbers for debugging stack traces
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Keep custom exceptions
-keep public class * extends java.lang.Exception

# WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve annotations
-keepattributes *Annotation*

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator CREATOR;
}

# Security: Remove logging in release
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
