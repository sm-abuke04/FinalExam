var modal = document.getElementById("newsModal");
        var span = document.getElementsByClassName("close")[0];
        var readMoreLinks = document.getElementsByClassName("read-more");

        span.onclick = function() {
            closeModal();
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }

        for (var i = 0; i < readMoreLinks.length; i++) {
            readMoreLinks[i].onclick = function(e) {
                e.preventDefault();
                var newsCard = this.closest('.news-card');
                openModal(newsCard);
            }
        }

        function openModal(newsCard) {
            var title = newsCard.querySelector('h3').innerText;
            var date = newsCard.querySelector('.date').innerText;
            var content = newsCard.querySelector('.full-content').innerHTML;
            var imageSrc = newsCard.querySelector('img').src;
            
            document.getElementById("modalTitle").innerHTML = title;
            document.getElementById("modalDate").innerHTML = date;
            document.getElementById("modalContent").innerHTML = content;
            document.getElementById("modalImage").src = imageSrc;
            
            modal.style.display = "block";
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }

        function closeModal() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }