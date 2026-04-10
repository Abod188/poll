document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('surveyForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const submitBtn = document.getElementById('submitBtn');
    const placeholderEmail = 'YOUR_EMAIL@example.com';

    if(form) {
        form.addEventListener('submit', function(e) {
            if (form.action.includes(placeholderEmail)) {
                e.preventDefault();
                alert('يرجى استبدال YOUR_EMAIL@example.com ببريدك الإلكتروني داخل ملف index.html قبل النشر.');
                return;
            }

            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري الإرسال...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            // إرسال البيانات إلى FormSubmit بدون الحاجة لخادم backend
            fetch(form.action, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            })
            .then(() => {
                modal.classList.add('active');
                form.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            })
            .catch((error) => {
                console.error('Submission error:', error);
                alert('تعذر إرسال الاستبيان الآن. تحقق من الاتصال وحاول مرة أخرى.');
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            });
        });
    }

    if(closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
});
