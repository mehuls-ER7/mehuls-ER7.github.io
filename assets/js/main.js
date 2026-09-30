(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Typing headline (words come from typing_words in _config.yml)
  var title = document.getElementById('heroTitle');
  var el = document.getElementById('rotator');
  if (title && el) {
    var words = (title.getAttribute('data-words') || 'anything').split('|');
    if (reduce) {
      el.textContent = words[words.length - 1];
    } else {
      var w = 0, c = words[0].length, deleting = false;
      (function tick() {
        var word = words[w];
        el.textContent = word.slice(0, c);
        var delay = deleting ? 55 : 110;
        if (!deleting && c === word.length) { deleting = true; delay = 1400; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
        else { c += deleting ? -1 : 1; }
        setTimeout(tick, delay);
      })();
    }
  }

  // Optional: random category cards (set shuffle_cards: true in _config.yml)
  var catGrid = document.getElementById('catGrid');
  if (catGrid && catGrid.getAttribute('data-shuffle') === 'true') {
    var max = parseInt(catGrid.getAttribute('data-max'), 10) || 6;
    var cards = Array.prototype.slice.call(catGrid.children);
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = cards[i]; cards[i] = cards[j]; cards[j] = t;
    }
    cards.forEach(function (card, idx) {
      catGrid.appendChild(card);
      card.classList.toggle('is-extra', idx >= max);
    });
  }

  // Homepage: topic chips + search + "show more"
  var grid = document.getElementById('grid');
  if (grid) {
    var posts = Array.prototype.slice.call(grid.querySelectorAll('.post'));
    var chips = document.querySelectorAll('#chips .chip');
    var input = document.getElementById('searchInput');
    var empty = document.getElementById('empty');
    var moreBtn = document.getElementById('moreBtn');
    var PAGE = 9, limit = PAGE, topic = 'all';

    function apply() {
      var q = input.value.trim().toLowerCase();
      var matches = posts.filter(function (p) {
        var okTopic = topic === 'all' || p.getAttribute('data-topic') === topic;
        var okText = !q || p.textContent.toLowerCase().indexOf(q) !== -1;
        return okTopic && okText;
      });
      posts.forEach(function (p) { p.style.display = 'none'; });
      matches.slice(0, limit).forEach(function (p) { p.style.display = ''; });
      empty.style.display = matches.length ? 'none' : 'block';
      moreBtn.style.display = matches.length > limit ? '' : 'none';
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        topic = chip.getAttribute('data-topic');
        limit = PAGE;
        apply();
      });
    });
    input.addEventListener('input', function () { limit = PAGE; apply(); });
    document.getElementById('searchBtn').addEventListener('click', function () {
      apply();
      document.getElementById('posts').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
    moreBtn.addEventListener('click', function () { limit += PAGE; apply(); });
    apply();
  }

  // Newsletter (demo only: connect to Mailchimp, ConvertKit, etc.)
  var form = document.getElementById('newsForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      document.getElementById('thanks').style.display = 'block';
    });
  }
})();
