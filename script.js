// تحريك شريط الإعلانات
function initAnnouncementBar() {
    const announcements = [
        "🌟 برنامج إنقاص الوزن الأكثر فعالية في الوطن العربي",
        "💪 خطة غذائية متكاملة مع متابعة مستمرة",
        "✨ نتائج مضمونة مع الالتزام بالبرنامج",
        "🏆 أكثر من 1000 متدرب حققوا أهدافهم معنا",
        "📱 دعم فني على مدار الساعة عبر الواتساب"
    ];

    const container = document.querySelector('.announcement-content');
    if (!container) return;

    announcements.forEach(text => {
        const span = document.createElement('span');
        span.textContent = text;
        container.appendChild(span);
    });
}

// تفعيل زر العودة للأعلى
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// تفعيل التأثيرات عند التمرير
function initScrollEffects() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
}

// تفعيل الأسئلة الشائعة
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل حالة السؤال الحالي
            item.classList.toggle('active');
        });
    });
}

// تحسين أداء التمرير
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// بيانات الوجبات
const mealData = {
    breakfast: {
        calories: 350,
        protein: 25,
        carbs: 45,
        fat: 12,
        items: [
            "شريحتان من خبز الشوفان (140 سعرة)",
            "بيضة مسلوقة (70 سعرة)",
            "30 جرام جبنة قليلة الدسم (80 سعرة)",
            "خيار وطماطم طازجة (30 سعرة)",
            "شاي أخضر (0 سعرة)"
        ]
    },
    lunch: {
        calories: 450,
        protein: 35,
        carbs: 50,
        fat: 15,
        items: [
            "صدر دجاج مشوي 150جم (250 سعرة)",
            "سلطة خضراء كبيرة (50 سعرة)",
            "نصف كوب أرز بني (110 سعرة)",
            "شوربة خضار (40 سعرة)"
        ]
    },
    dinner: {
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        items: [
            "سلطة تونة (180 سعرة)",
            "خضروات مشوية (70 سعرة)",
            "زبادي قليل الدسم (50 سعرة)"
        ]
    }
};

// تحديث القيم الغذائية لكل وجبة
function updateMealNutrition() {
    const meals = ['breakfast', 'lunch', 'dinner'];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    meals.forEach((meal, index) => {
        const data = mealData[meal];
        const mealCard = document.querySelectorAll('.meal-card')[index];
        
        if (mealCard) {
            // تحديث القيم الغذائية للوجبة
            const nutritionItems = mealCard.querySelectorAll('.nutrition-item span');
            nutritionItems[0].textContent = data.calories;
            nutritionItems[1].textContent = data.protein;
            nutritionItems[2].textContent = data.carbs;
            nutritionItems[3].textContent = data.fat;

            // تحديث قائمة المكونات مع السعرات
            const ul = mealCard.querySelector('ul');
            ul.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');

            // إضافة المجاميع
            totalCalories += data.calories;
            totalProtein += data.protein;
            totalCarbs += data.carbs;
            totalFat += data.fat;
        }
    });

    // تحديث المجموع الكلي
    document.querySelector('.total-nutrition .calories .value').textContent = totalCalories;
    document.querySelector('.total-nutrition .protein .value').textContent = totalProtein;
    document.querySelector('.total-nutrition .carbs .value').textContent = totalCarbs;
    document.querySelector('.total-nutrition .fat .value').textContent = totalFat;
}

// حساب وعرض مجموع السعرات
function updateTotalCalories() {
    const mealCards = document.querySelectorAll('.meal-card');
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    // حساب مجموع السعرات من كل وجبة
    mealCards.forEach(card => {
        const caloriesText = card.querySelector('.calories span').textContent;
        totalCalories += parseInt(caloriesText);
    });

    // تحديث البروتين والكربوهيدرات والدهون
    totalProtein = 80; // جرام
    totalCarbs = 105;  // جرام
    totalFat = 37;     // جرام

    // تحديث العرض
    document.querySelector('.calorie-card.total .amount').textContent = totalCalories;
    document.querySelector('.calorie-card:nth-child(2) .amount').textContent = totalProtein;
    document.querySelector('.calorie-card:nth-child(3) .amount').textContent = totalCarbs;
    document.querySelector('.calorie-card:nth-child(4) .amount').textContent = totalFat;
}

// تهيئة جميع الوظائف عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initAnnouncementBar();
    initScrollToTop();
    initScrollEffects();
    initFAQ();
    updateMealNutrition();
    updateTotalCalories();

    // تحسين أداء التمرير
    window.addEventListener('scroll', debounce(() => {
        // يمكن إضافة وظائف إضافية هنا
    }, 100));
});
