const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const fields = {
        name: {
            input: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate(value) {
                if (!value.trim()) {
                    return 'Please enter your name.';
                }

                if (value.trim().length < 2) {
                    return 'Name must be at least 2 characters.';
                }

                return '';
            }
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate(value) {
                const trimmedValue = value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!trimmedValue) {
                    return 'Please enter your email address.';
                }

                if (!emailPattern.test(trimmedValue)) {
                    return 'Enter a valid email address.';
                }

                return '';
            }
        },
        subject: {
            input: document.getElementById('subject'),
            error: document.getElementById('subjectError'),
            validate(value) {
                if (!value.trim()) {
                    return 'Please enter a subject.';
                }

                if (value.trim().length < 3) {
                    return 'Subject must be at least 3 characters.';
                }

                return '';
            }
        },
        message: {
            input: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate(value) {
                if (!value.trim()) {
                    return 'Please enter a message.';
                }

                if (value.trim().length < 10) {
                    return 'Message must be at least 10 characters.';
                }

                return '';
            }
        }
    };

    const formStatus = document.getElementById('formStatus');

    function setFieldState(field, message) {
        field.error.textContent = message;
        field.input.classList.toggle('input-error', Boolean(message));
        field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateField(fieldName) {
        try {
            const field = fields[fieldName];
            const message = field.validate(field.input.value);

            setFieldState(field, message);
            return !message;
        } catch (error) {
            console.error(`Validation failed for ${fieldName}:`, error);
            formStatus.textContent = 'Something went wrong while validating the form.';
            formStatus.className = 'form-status form-status-error';
            return false;
        }
    }

    function clearFormStatus() {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];

        field.input.addEventListener('input', () => {
            try {
                validateField(fieldName);
                clearFormStatus();
            } catch (error) {
                console.error(`Input handling failed for ${fieldName}:`, error);
                formStatus.textContent = 'Something went wrong while checking that field.';
                formStatus.className = 'form-status form-status-error';
            }
        });
    });

    contactForm.addEventListener('submit', (event) => {
        try {
            event.preventDefault();

            const isFormValid = Object.keys(fields).every((fieldName) => validateField(fieldName));

            if (!isFormValid) {
                formStatus.textContent = 'Please fix the highlighted fields and try again.';
                formStatus.className = 'form-status form-status-error';
                return;
            }

            formStatus.textContent = 'Your message is valid and ready to send.';
            formStatus.className = 'form-status form-status-success';
            contactForm.reset();
            Object.keys(fields).forEach((fieldName) => setFieldState(fields[fieldName], ''));
        } catch (error) {
            console.error('Form submission handling failed:', error);
            formStatus.textContent = 'Something went wrong. Please try again.';
            formStatus.className = 'form-status form-status-error';
        }
    });
}