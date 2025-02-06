document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect form data using FormData API
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        const bookingData = { name: formData.get('name'), email: formData.get('email'), message: formData.get('message') };

        try {
            // Send data to the bookings API
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                alert('Booking submitted successfully!');
                form.reset(); // Reset form after successful submission
            } else {
                alert('Error submitting booking. Please try again.');
            }

            // Send data to the contact API (second endpoint)
            const contactResponse = await fetch("/contact", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (contactResponse.ok) {
                alert('Inquiry sent successfully');
                form.reset(); // Reset form after submission
            } else {
                alert('Error sending inquiry');
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try later.");
        }
    });
});
