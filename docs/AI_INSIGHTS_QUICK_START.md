# AI Insights Dashboard - Quick Start Guide

## 🚀 Quick Access

Once logged in as an **EDUCATOR**, you can access the AI Insights Dashboard in two locations:

### Option 1: Main Dashboard
```
URL: http://localhost:3000/dashboard
Location: Top of the educator dashboard
```

### Option 2: Analytics Page
```
URL: http://localhost:3000/analytics
Location: First section after the header
```

---

## 📊 What You'll See

### Section Header
```
🔷 AI Wrapper Insights Panel
   Analytics and predictions on student performance
```

### Controls
- **[Week] [Month] [Semester]** - Time period buttons
- **[↻]** - Refresh button

---

## 📈 Dashboard Components

### 1️⃣ Metric Cards (Top Row)
```
┌─────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌─────────────────┐
│ Average Grade   │ │ Late Submissions │ │ Students at Risk │ │ Completion Rate │
│      78%        │ │       14         │ │        3         │ │      85%        │
│  ↑ 5% trend     │ │  Out of 145      │ │  Need attention  │ │  Assignment %   │
└─────────────────┘ └──────────────────┘ └──────────────────┘ └─────────────────┘
```

### 2️⃣ AI Insights Cards (Alert Section)
```
⚠️  3 students at risk of failing                [High Priority - Red]
📈  Average grade ↑ 5% this period              [Positive - Green]
📊  85% assignment completion rate              [Neutral - Blue]
⏰  High number of late submissions (14)        [Warning - Orange]
```

### 3️⃣ Charts (Side by Side)

**Grade Trend (Line Chart)**
```
100% │         ╱─╲
 90% │        ╱   ╲
 80% │    ╱─╱     ╲
 70% │ ╱─╱         ╲
 60% │╱
     └───────────────
      W1  W2  W3  W4
```

**Grade Distribution (Bar Chart)**
```
30 │        ██
25 │        ██  ██
20 │        ██  ██
15 │        ██  ██  ██
10 │  ██    ██  ██  ██  ██
 5 │  ██    ██  ██  ██  ██
   └─────────────────────
     A    B    C    D    F
   (90+) (80) (70) (60) (<60)
```

### 4️⃣ At-Risk Students Table
```
┌────────────────┬───────────────┬──────────────────┬────────────┐
│ Student Name   │ Average Grade │ Late Submissions │ Risk Level │
├────────────────┼───────────────┼──────────────────┼────────────┤
│ John Doe       │ 55%           │ 3                │ High       │
│ Jane Smith     │ 58%           │ 2                │ Medium     │
│ Bob Johnson    │ 62%           │ 0                │ Medium     │
└────────────────┴───────────────┴──────────────────┴────────────┘
```

### 5️⃣ Overview Statistics (Bottom)
```
┌─────────────────┐ ┌──────────────────┐ ┌─────────────────┐
│ 👥 Total        │ │ ✅ Total         │ │ 📚 Active       │
│    Students     │ │    Submissions   │ │    Courses      │
│      68         │ │      145         │ │       4         │
└─────────────────┘ └──────────────────┘ └─────────────────┘
```

---

## 🎯 Key Features

### Interactive Elements
- ✅ **Period Filters**: Click Week/Month/Semester to change timeframe
- ✅ **Refresh Button**: Reload latest data
- ✅ **Hover Effects**: Charts show detailed tooltips
- ✅ **Responsive**: Works on all screen sizes

### Color Coding
- 🔴 **Red**: High risk, negative trends
- 🟠 **Orange**: Medium priority warnings
- 🟢 **Green**: Positive trends, good performance
- 🔵 **Blue**: Informational metrics
- 🟣 **Purple**: Additional statistics

### Smart Insights
The dashboard automatically detects:
- Students with grades below 60%
- Students with 2+ late submissions
- Grade trends (up or down)
- Low completion rates
- High numbers of late submissions

---

## 📱 Responsive Design

### Desktop (1920px+)
- 4 metric cards in one row
- 2 charts side by side
- Full-width table

### Tablet (768px - 1919px)
- 2 metric cards per row
- Charts stacked or side by side
- Scrollable table

### Mobile (< 768px)
- 1 metric card per row
- Charts stacked vertically
- Horizontally scrollable table

---

## 🔄 Data Refresh

Data automatically loads when:
- Page first loads
- Period filter is changed
- Refresh button is clicked

**Loading State**: Skeleton loaders appear during data fetch

**Error State**: Friendly error message with retry option

---

## 🎨 Visual Indicators

### Risk Levels
- **High Risk**: Red badge, >= 50% failing or 3+ late submissions
- **Medium Risk**: Orange badge, 50-59% or 2 late submissions

### Trends
- **↑ Green**: Performance improving
- **↓ Red**: Performance declining
- **→ Gray**: Stable performance

### Completion Rate
- **Green**: 80%+
- **Blue**: 60-79%
- **Orange**: < 60%

---

## 🧮 Calculations Explained

### Average Grade
```
Sum of all graded submissions / Total graded submissions
```

### At-Risk Count
```
Students where (Average Grade < 60%) OR (Late Submissions >= 2)
```

### Completion Rate
```
(Total Submissions / (Assignments × Students)) × 100
```

### Trend Change
```
((Current Period Avg - Previous Period Avg) / Previous Period Avg) × 100
```

---

## 🎓 Use Cases

### For Course Management
- Identify struggling students early
- Track overall class performance
- Monitor assignment completion
- Spot trends before they become problems

### For Intervention
- See which students need help
- Prioritize outreach by risk level
- Track impact of interventions
- Monitor late submission patterns

### For Reporting
- Generate performance summaries
- Show trends to administrators
- Document student progress
- Support data-driven decisions

---

## 💡 Tips

1. **Check Weekly**: Review insights at the start of each week
2. **Contact At-Risk Students**: Reach out proactively
3. **Track Trends**: Compare periods to see improvement
4. **Use Filters**: Focus on specific timeframes
5. **Export Data**: Use browser print or screenshot for reports

---

## ❓ Troubleshooting

### No Data Showing
- Ensure you have courses assigned
- Check that students have submitted assignments
- Verify you're logged in as EDUCATOR

### Wrong Data
- Click refresh button
- Check selected time period
- Verify course assignments

### Charts Not Loading
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

---

## 🔗 Related Pages

- **Main Dashboard**: `/dashboard`
- **Analytics Page**: `/analytics`
- **Grading**: `/grading`
- **Students**: `/students`
- **Grade Requests**: `/grade-requests`

---

**Need Help?** Check `docs/AI_INSIGHTS_README.md` for detailed documentation.
