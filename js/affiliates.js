(function () {
  function amazonUrl(query) {
    var cfg = window.AFFILIATE || {}
    var base = (cfg.marketplace || 'https://www.amazon.es') + '/s'
    var params = new URLSearchParams({ k: query })
    if (cfg.tag) params.set('tag', cfg.tag)
    return base + '?' + params.toString()
  }

  function mountHeader() {
    var el = document.getElementById('site-header')
    if (!el) return
    el.innerHTML =
      '<div class="wrap header-inner">' +
      '<a class="logo" href="ROOT">Oscuro y quieto</a>' +
      '<nav>' +
      '<a href="ROOT">Inicio</a>' +
      '<a href="GUIAS">Guías</a>' +
      '<a href="AVISO">Afiliados</a>' +
      '</nav></div>'
    var root = el.dataset.root || ''
    el.innerHTML = el.innerHTML
      .replace(/ROOT/g, root + 'index.html')
      .replace(/GUIAS/g, root + 'guias/index.html')
      .replace(/AVISO/g, root + 'aviso-afiliados.html')
  }

  function mountFooter() {
    var el = document.getElementById('site-footer')
    if (!el) return
    var root = el.dataset.root || ''
    var cfg = window.AFFILIATE || {}
    el.innerHTML =
      '<div class="wrap">' +
      '<p class="fine">' +
      (cfg.disclosure || '') +
      ' Amazon y el logotipo de Amazon son marcas de Amazon.com, Inc. o de sus afiliados. Este sitio no es Amazon ni está afiliado a Bulkhead/Team17 ni a ningún estudio de videojuegos.' +
      '</p>' +
      '<p class="fine"><a href="' +
      root +
      'aviso-afiliados.html">Aviso de afiliados</a> · <a href="' +
      root +
      'privacidad.html">Privacidad</a> · <a href="' +
      root +
      'cookies.html">Cookies</a></p>' +
      '</div>'
  }

  function mountBanner() {
    var el = document.getElementById('affiliate-banner')
    if (!el) return
    var cfg = window.AFFILIATE || {}
    el.textContent = cfg.tag
      ? cfg.disclosure
      : 'Enlaces a Amazon.es. Aún no hay tag de afiliado configurado: las compras no generan comisión. Aviso legal en /aviso-afiliados.html'
  }

  function bindAmazonLinks() {
    document.querySelectorAll('[data-amazon]').forEach(function (a) {
      var q = a.getAttribute('data-amazon')
      a.href = amazonUrl(q)
      a.rel = 'nofollow sponsored noopener'
      a.target = '_blank'
    })
  }

  mountHeader()
  mountFooter()
  mountBanner()
  bindAmazonLinks()
})()
