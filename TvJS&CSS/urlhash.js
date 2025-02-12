document.addEventListener("DOMContentLoaded", function () {
    function filterSelection(tag) {
        const list = document.querySelectorAll('#youtube-list li');
        const buttons = document.querySelectorAll('.btn');

        // Normalize tag to lowercase for consistency
        tag = tag.toLowerCase();

        // Reset button active state
        buttons.forEach(btn => btn.classList.remove('active'));

        // Find the correct button and activate it
        const clickedButton = [...buttons].find(btn => btn.textContent.trim().toLowerCase().includes(tag));
        if (clickedButton) {
            clickedButton.classList.add('active');
            clickedButton.click(); // Simulate user clicking the button
        }

        // Filter videos
        list.forEach(item => {
            const tags = item.getAttribute('data-tags').toLowerCase().split(',');
            if (tag === 'all' || tags.includes(tag)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    function applyFilterFromURL() {
        const hash = window.location.hash.substring(1).toLowerCase(); // Get the hash without '#'

        if (hash) {
            filterSelection(hash);
        } else {
            filterSelection('all'); // Default to 'all' only if no hash
        }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", applyFilterFromURL);

    // Apply filter on page load without delay
    applyFilterFromURL();
});
