# HomeMeals - Quick Troubleshooting Guide

## ✅ Green Light - Everything Working

If you see this, you're all set:

```
✓ Server running at http://localhost:5001
✓ Client running at http://localhost:5173
✓ Database connected
✓ App loads in browser
```

---

## 🔴 Issues & Fixes

### Issue 1: Port Already in Use

**Problem:** 
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solution:**
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>

# Or use a different port:
PORT=5002 npm start
```

---

### Issue 2: "Cannot find module" Error

**Problem:**
```
Error: Cannot find module 'sqlite3'
```

**Solution:**
```bash
cd server
npm install
```

---

### Issue 3: Database File Not Found

**Problem:**
```
Error: Failed to connect to SQLite database
```

**Solution:**
```bash
cd server
rm -rf database/homemeals.db
npm start
# Server will recreate the database
```

---

### Issue 4: CORS Errors in Browser

**Problem:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**
Check if backend is running on `http://localhost:5001`:
```bash
curl http://localhost:5001/
# Should return: {"message": "🍛 HomeMeals API is running", "status": "ok"}
```

---

### Issue 5: API Returns Empty Data

**Problem:**
```
GET /api/meals returns: {"success": true, "data": []}
```

**Solution:**
This is normal - the database is empty. Add a meal via the UI:
1. Click "Add Meal" in navigation
2. Fill in the form
3. Click Save

Or create a test meal via API:
```bash
curl -X POST http://localhost:5001/api/meals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "category": "Appetizer",
    "area": "Italian",
    "instructions": "Mix and serve",
    "thumbnail": "https://via.placeholder.com/100",
    "ingredients": []
  }'
```

---

### Issue 6: TheMealDB API Errors

**Problem:**
```
Failed to load meal suggestions from TheMealDB
```

**Solution:**
This is usually temporary. The app will keep trying.

To test connectivity:
```bash
curl http://localhost:5001/api/themealdb/random.php
# Should return meal data
```

---

### Issue 7: Build Fails

**Problem:**
```
vite build fails
```

**Solution:**
```bash
cd client
npm install
npm run build
```

---

### Issue 8: Old Data Not Showing

**Problem:**
Saved meals disappeared after restart

**Solution:**
The database should persist. If meals are gone:
1. Check database file exists:
   ```bash
   ls -la server/database/homemeals.db
   ```
2. If it exists, data should be there
3. If not found, the database was deleted
   - Restart the server to recreate it

---

## 🧪 Testing Quick Checks

### Check 1: Is Backend Running?
```bash
curl http://localhost:5001/
# Should return JSON with message
```

### Check 2: Can Backend Connect to Database?
```bash
curl http://localhost:5001/api/meals
# Should return {"success": true, "data": [...]}
```

### Check 3: Can Frontend Connect to Backend?
1. Open `http://localhost:5173`
2. Open browser DevTools (F12)
3. Go to Network tab
4. Reload page
5. Look for `/api/meals` request
6. Should be status 200

### Check 4: Are Both Servers Running?
```bash
# Check server (port 5001)
lsof -i :5001

# Check client (port 5173)
lsof -i :5173
```

---

## 🔧 Fix Common Issues

### Restart Everything
```bash
# Stop servers (Ctrl+C in each terminal)
# Terminal 1: kill the backend
# Terminal 2: kill the frontend

# Restart backend
cd ~/Downloads/HomeMeals/server
npm start

# Restart frontend (in new terminal)
cd ~/Downloads/HomeMeals/client
npm run dev
```

### Clear Cache & Reinstall
```bash
cd ~/Downloads/HomeMeals/server
rm -rf node_modules package-lock.json
npm install
npm start

# In another terminal:
cd ~/Downloads/HomeMeals/client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Reset Database
```bash
cd ~/Downloads/HomeMeals/server
rm database/homemeals.db
npm start
# Database will be recreated on startup
```

---

## 📱 Testing in Browser

1. **Open:** http://localhost:5173

2. **Test Navigation:**
   - Click "Home" - should show meals
   - Click "Search" - should show search form
   - Click "Add Meal" - should show add form

3. **Test Features:**
   - Click on a meal - should show details
   - Try adding a new meal
   - Try searching for a meal
   - Try saving/deleting meals

4. **Check Browser Console:**
   - Press F12
   - Go to "Console" tab
   - Should see no red errors
   - May see yellow warnings (normal)

---

## ❓ Still Having Issues?

### Check These First:
- [ ] Both servers running (terminal shows no errors)
- [ ] Ports 5001 and 5173 are open
- [ ] Browser is at `http://localhost:5173`
- [ ] Browser DevTools Console (F12) shows no major errors
- [ ] Network tab shows API requests returning 200/201 status

### Gather Debug Info:
```bash
# What's running?
lsof -i :5001
lsof -i :5173

# Can you reach the API?
curl -v http://localhost:5001/api/meals

# What's in the database?
sqlite3 ~/Downloads/HomeMeals/server/database/homemeals.db
# Then type: SELECT COUNT(*) FROM meals;
```

---

## 📋 Verification Checklist

- [ ] Server starts without errors
- [ ] Frontend starts without errors  
- [ ] API responds to requests
- [ ] Database file exists
- [ ] Browser can load http://localhost:5173
- [ ] No red errors in console (F12)
- [ ] Can view saved meals
- [ ] Can add a new meal
- [ ] Can search for meals
- [ ] Can view meal details

If all ✅, everything is working!

---

## 🎯 Remember

- **Backend:** `http://localhost:5001`
- **Frontend:** `http://localhost:5173`
- **Database:** `/server/database/homemeals.db`
- **Logs:** Check terminal output
- **Errors:** Press F12 in browser for console errors
