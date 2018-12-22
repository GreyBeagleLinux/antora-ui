; (function () {
  'use strict'
  /* global ClipboardJS */
  function addBlockClipboard () {
    // inject .asciidoctorcopypaste class to all .listingblock
    find('.listingblock', document).forEach(function (item, idx) {
      if (!item.getAttribute('id')) {
        item.setAttribute('id', 'listingblock' + (idx++))
      }
      createBlockClipboard(item)
    })

    try {
      var clipboard = new ClipboardJS('.asciidoctorcopypaste')
      clipboard.on('success', function (e) {
        var element = e.trigger
        element.innerHTML = '&nbsp;&nbsp;&nbsp;Copied!'
        setTimeout(function () {
          element.innerHTML = '&nbsp;'
        }, 1000)
        e.clearSelection()
      })
    } catch (e) {
      console.log(e)
    }
  }

  function createBlockClipboard (block) {
    find('.content', block).forEach(function (content) {
      var id = block.getAttribute('id') + '_content'
      content.setAttribute('id', id)
      var str = '<button class="asciidoctorcopypaste" id="' +
                id + '-copy-button" data-clipboard-target="#' +
                id + '">&nbsp;</button>'
      var title = find('.title', block)
      if (title.length) {
        title[0].innerHTML = title[0].innerHTML + '&nbsp;&nbsp;' + str
      } else {
        content.innerHTML = str + content.innerHTML
      }
    })
  }

  function find (selector, from) {
    return [].slice.call((from || document).querySelectorAll(selector))
  }

  addBlockClipboard()
})()