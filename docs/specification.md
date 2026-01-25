# **Project Specification: Minimal Weather App**

## **1\. Executive Summary**

**Project Name:** Minimal Weather  
**Platform:** Web (Responsive), iOS (via Capacitor)  
**Core Concept:** A minimalistic weather dashboard that visualizes daily temperature ranges using floating vertical bars, allowing users to explore past and future weather trends fluidly.

## **2\. Functional Requirements**

### **2.1. Location Services**

* **Auto-Detection:** On application load, the app must attempt to retrieve the user's geographic coordinates using the browser's navigator.geolocation API.  
* **Fallback Strategy:** If geolocation is denied, fails, or is unavailable, the app must default to a hardcoded location: **Dallas, US** (Lat: 32.7767, Lon: \-96.7970).  
* **City Search:**  
  * Users can input a city name via a text input field.  
  * The app must query a Geocoding API to resolve the name to coordinates.  
  * **Error Handling:** If a city is not found, display a clear error message and hide data visualizations.

### **2.2. Weather Data Retrieval**

* **Data Source:** Open-Meteo API (Free, non-commercial use allowed).  
* **Endpoints Used:**  
  * forecast: For daily and current weather data.  
  * search: For geocoding city names.  
* **Data Points Required:**  
  * **Daily:** Maximum Temperature, Minimum Temperature, Weather Code (WMO), Date.  
  * **Current:** Temperature (2m), Weather Code.  
* **Timeframe Logic:** The API request must dynamically adjust past\_days and forecast\_days based on user input.

### **2.3. User Controls**

* **Range Slider:**  
  * Input: Slider (Range Input).  
  * Values: 1 to 14 days.  
  * Function: Determines the buffer of days *before* and *after* today (e.g., selecting "4" fetches 4 past days \+ Today \+ 4 future days).  
  * Location: Integrated into the main chart area.  
* **Unit Toggle:**  
  * Switch between Celsius (°C) and Fahrenheit (°F).  
  * **Technical Constraint:** API data is *always* fetched in Celsius to prevent flicker. Conversion happens on the client-side during render.  
* **Theme Toggle:**  
  * Switch between **Dark Mode** (default) and **Light Mode**.  
  * Persists visually across the entire application interface.

### **2.4. Data Visualization (The Chart)**

* **Vertical Bar Chart:**  
  * Each day is represented by a vertical pill-shaped bar.  
  * **Height:** Proportional to the daily temperature spread (Max \- Min).  
  * **Y-Position:** Relative to the global minimum temperature of the currently displayed dataset.  
  * **Styling:** Gradient fill (Sky Blue to Amber).  
* **Reactive Layout:** Bars must resize width responsively (35% of column width) but maintain min/max width constraints (8px/48px) for readability.  
* **Labels:** Temperature values must be permanently visible at the top (Max) and bottom (Min) of each bar.

### **2.5. Current Conditions**

* Display a dedicated section showing:  
  * Current Weather Icon.  
  * Text description (e.g., "Partly Cloudy").  
  * Current Temperature in dual format (e.g., 24°C / 75°F) to allow instant reference without toggling.

## **3\. Technical Architecture**

### **3.1. Tech Stack**

* **Frontend Framework:** React 18+  
* **Build Tool:** Vite  
* **Language:** JavaScript (ES6+) or JSX  
* **Styling Engine:** Tailwind CSS (Utility-first)  
* **Icons:** Lucide React  
* **Native Wrapper:** Capacitor (for iOS deployment)

### **3.2. State Management**

The application uses local React state (useState, useEffect, useMemo) to manage:

* location: Object { lat, lon, name }  
* weatherData: Array of daily weather objects.  
* currentWeather: Object { temp, code }  
* daysBuffer: Integer (Slider value)  
* unit: String ('celsius' | 'fahrenheit')  
* theme: String ('dark' | 'light')  
* loading / error: Boolean/String statuses.

### **3.3. API Integration Logic**

* **Fetch URL Construction:**  
  \`https://api.open-meteo.com/v1/forecast?latitude=${lat}\&longitude=${lon}\&daily=temperature\_2m\_max,temperature\_2m\_min,weathercode\&current=temperature\_2m,weather\_code\&timezone=auto\&past\_days=${days}\&forecast\_days=${days \+ 1}\&temperature\_unit=celsius\`

* **Performance Optimization:**  
  * Fetch only when location or daysBuffer changes.  
  * Do **not** re-fetch when unit or theme changes (client-side handling).

## **4\. UI/UX Design Specifications**

### **4.1. Color Palette**

| Element | Dark Mode (Hex approx) | Light Mode (Hex approx) |
| :---- | :---- | :---- |
| **Background** | Slate-900 (\#0f172a) | Slate-100 (\#f1f5f9) |
| **Card Bg** | Slate-800 (\#1e293b) | White (\#ffffff) |
| **Text Primary** | Slate-100 (\#f1f5f9) | Slate-800 (\#1e293b) |
| **Text Secondary** | Slate-400 (\#94a3b8) | Slate-500 (\#64748b) |
| **Accent/Gradient** | Sky-500 (\#0ea5e9) to Amber-400 (\#fbbf24) | Same |

### **4.2. Layout Structure**

1. **Header:**  
   * Left: Location Name & Coordinates (Icon: MapPin).  
   * Center/Right (Desktop): Search Bar.  
   * Far Right: Theme Toggle (Sun/Moon).  
2. **Current Weather Card:**  
   * Floating card layout with distinct border color.  
   * Icon \+ Description on left.  
   * Large Dual-Temp display on right.  
3. **Chart Controls:**  
   * Centered Pill container.  
   * Range Slider \+ Unit Toggle button.  
4. **Main Chart Area:**  
   * Horizontal scrollable container (overflow-x-auto).  
   * Background horizontal grid lines (opacity 20%).  
   * Flex container for Days.

### **4.3. Responsive Behavior**

* **Mobile:**  
  * Header elements stack vertically.  
  * Chart area allows horizontal scrolling if bars exceed viewport width.  
  * Search bar expands to full width.  
* **Desktop:**  
  * Header elements align horizontally.  
  * Chart area expands to fill container width.

## **5\. Error Handling & Edge Cases**

* **Loading State:** A semi-transparent overlay with a spinning loader (Lucide Loader2) must appear over the chart/data area during fetch operations.  
* **API Failure:** If the API returns 404 or 500, hide the chart and controls. Display a centered error message with a "Reset" button that reloads the page.  
* **Zero Range:** Mathematical safety check to prevent division by zero if GlobalMax \=== GlobalMin.

## **6\. Native iOS Considerations (Capacitor)**

* **Safe Areas:** CSS must include env(safe-area-inset-top) and bottom to avoid notch/home bar overlap.  
* **Permissions:** NSLocationWhenInUseUsageDescription must be added to Info.plist to allow Geolocation on iOS.