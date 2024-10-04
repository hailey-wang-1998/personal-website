document.addEventListener('DOMContentLoaded', function() {
  const viewProjectLinks = document.querySelectorAll('.link');
  viewProjectLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      if (link.getAttribute('href') === '#graphics') {
        event.preventDefault(); 
        const graphicsSection = document.getElementById('graphics');
        graphicsSection.scrollIntoView({ behavior: 'smooth' }); 
      }
    });
  });
});


