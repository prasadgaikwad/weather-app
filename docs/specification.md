# **Project Specification: Minimal Weather App**

## **1\. Executive Summary**

**Project Name:** Minimal Weather  
**Platform:** Web (Responsive), iOS (via Capacitor)  
**Core Concept:** A minimalistic weather dashboard that visualizes daily temperature ranges using floating vertical bars, allowing users to explore past and future weather trends fluidly.

## **2\. Functional Requirements**

### **2.1. Location Services**

* **Auto-Detection:** On application load, the app attempts to retrieve the user's geographic coordinates using the browser's navigator.geolocation API.  
* **Reverse Geocoding:** The app queries BagDataCloud API to resolve coordinates to a readable "City, Region, Country" name to display instead of raw coordinates.
* **Fallback Strategy:** If geolocation is denied or fails, the app defaults to: **Dallas, US**.  
* **Persistence:** The last selected location is saved to local storage and restored on app launch.
* **City Search:**  
  * Users can input a city name via a text input field.  
  * The app queries Open-Meteo Geocoding API to resolve the name to coordinates.  
  * **Error Handling:** If a city is not found, display a clear error message.

### **2.2. Weather Data Retrieval**

* **Data Source:** Open-Meteo API (Free, non-commercial use allowed).  
* **Endpoints Used:**  
  * `forecast`: For daily and current weather data.  
  * `search`: For geocoding city names.  
* **Data Points Required:**  
  * **Daily:** Maximum Temperature, Minimum Temperature, Weather Code (WMO), Date.  
  * **Current:** Temperature (2m), Weather Code.  
* **Timeframe Logic:** The API request dynamically adjusts `past_days` and `forecast_days` based on user input.

### **2.3. User Controls**

* **Range Slider:**  
  * Input: Slider (Range Input).  
  * Values: 1 to 14 days.  
  * **Default:** ±1 days (Yesterday, Today, Tomorrow).
  * Function: Determines the buffer of days *before* and *after* today.
  * Location: Integrated into the main chart area.  
* **Unit Toggle:**  
  * Switch between Celsius (°C) and Fahrenheit (°F).  
  * **Technical Constraint:** API data is *always* fetched in Celsius. Conversion happens on the client-side.  
* **Theme Toggle:**  
  * Switch between **Dark Mode** (default) and **Light Mode**.  
  * Persists visually across the entire application interface.
* **Refresh Button:**
  * Located in the header.
  * Manually triggers a re-fetch of weather data for the current location.

### **2.4. Data Visualization (The Chart)**

* **Vertical Bar Chart:**  
  * Each day is represented by a vertical pill-shaped bar.  
  * **Height:** Proportional to the daily temperature spread (Max \- Min).  
  * **Y-Position:** Relative to the global minimum temperature of the currently displayed dataset.  
  * **Styling:** Gradient fill (Sky Blue to Amber).  
  * **Weather Icons:** A weather icon (Sun, Cloud, Rain, etc.) is displayed at the top of each bar.
* **Reactive Layout:** Bars resize width responsively. Top 15% of chart height reserved for labels to prevent cutoff.
* **Labels:** Temperature values permanently visible at the top (Max) and bottom (Min) of each bar.

### **2.5. Current Conditions**

* Display a dedicated section showing:  
  * Current Weather Icon.  
  * Text description in Title Case (e.g., "Partly Cloudy").  
  * Label "Current Conditions".
  * Current Temperature in dual format (e.g., 24°C / 75°F) on a single line.

## **3\. Technical Architecture**

### **3.1. Tech Stack**

* **Frontend Framework:** React 18+  
* **Build Tool:** Vite  
* **Language:** JavaScript (ES6+) or JSX  
* **Styling Engine:** Tailwind CSS (Utility-first)  
* **Icons:** Lucide React  
* **Native Wrapper:** Capacitor (for iOS deployment)

### **3.2. State Management**

The application uses local React state (useState, useEffect, useMemo) and **LocalStorage** for persistence:

* **Saved to LocalStorage:**
  * `location`: Object { lat, lon, name }  
  * `daysBuffer`: Integer (Slider value)  
  * `unit`: String ('celsius' | 'fahrenheit')
  * `theme`: String ('dark' | 'light')

* **Ephemeral State:**
  * `weatherData`: Array of daily weather objects.  
  * `currentWeather`: Object { temp, code }  
  * `loading` / `error`: Boolean/String statuses.

### **3.3. API Integration Logic**

* **Fetch URL Construction:**  
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current=temperature_2m,weather_code&timezone=auto&past_days=${days}&forecast_days=${days + 1}&temperature_unit=celsius`

* **Performance Optimization:**  
  * Fetch only when location or daysBuffer changes, or when Refresh is clicked.  
  * Do **not** re-fetch when unit or theme changes (client-side handling).

## **4\. UI/UX Design Specifications**

### **4.1. Layout Structure**

1. **Header:**  
   * **Prominent City Name:** Centered, large font (text-3xl), bold. (Latitude/Longitude display removed). 
   * **Controls (Right):** Search Bar, Refresh Button, Theme Toggle.
2. **Current Weather Card:**  
   * Floating card layout with distinct border color.  
   * Icon \+ Description on left.  
   * Large Dual-Temp display on right.  
3. **Chart Controls:**  
   * Centered Pill container.  
   * Range Slider \+ Unit Toggle button.  
4. **Main Chart Area:**  
   * Horizontal scrollable container (overflow-x-auto).  
   * Background horizontal grid lines.  

### **4.2. Responsive Behavior**

* **Mobile:**  
  * Header layout switches to Flex Column to stack city name above controls.
  * Chart area allows horizontal scrolling.  
* **Desktop:**  
  * Header uses a balanced 3-column layout to center the city name perfectly.
  * Chart area expands to fill container width.

## **5\. Error Handling & Edge Cases**

* **Loading State:** A semi-transparent overlay with a spinning loader (Lucide Loader2).  
* **API Failure:** Display a centered error message with a "Reset" button.  
* **Zero Range:** Safety checks for division by zero.

## **6\. Native iOS Considerations (Capacitor)**

* **Safe Areas:** CSS includes env(safe-area-inset-top) and bottom.  
* **Permissions:** `NSLocationWhenInUseUsageDescription` added to Info.plist.