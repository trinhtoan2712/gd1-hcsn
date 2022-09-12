export default{
    directives: {
      tooltip: {
        bind: function (el) {
          el.style.textOverflow = "ellipsis";
          el.style.display = "inline-block";
          el.style.whiteSpace = "nowrap";
          el.style.overflow = "hidden";
          
          el.addEventListener('mouseover', function (evt) {
            let targetEl = evt.target;
            if (targetEl.offsetWidth < targetEl.scrollWidth) {
              targetEl.setAttribute('title', evt.target.textContent);
            } else {
              targetEl.hasAttribute('title') && targetEl.removeAttribute('title');
            }
          });
        }
      }
    }
  };