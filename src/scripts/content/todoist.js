/*jslint indent: 2 plusplus: true*/
/*global $: false, togglbutton: false*/

'use strict';

togglbutton.render('.task_item .content:not(.toggl)', {observe: true}, function (elem) {
  var link, descFunc, container = $('.text', elem),
    projectElem = $('.project_link');

  descFunc = function () {
    var clone = container.cloneNode(true),
      i = 0,
      child = null;

    while (clone.children.length > i) {
      child = clone.children[i];
      if (child.tagName === "B"
          || child.tagName === "I") {
        i++;
      } else if (child.tagName === "A") {
        if (child.classList.contains("ex_link")
            || child.getAttribute("href").indexOf("mailto:") === 0) {
          i++;
        } else {
          child.remove();
        }
      } else {
        child.remove();
      }
    }

    return clone.textContent.trim();
  };

  link = togglbutton.createTimerLink({
    className: 'todoist',
    description: descFunc,
    projectName: projectElem && projectElem.textContent
  });

  container.insertBefore(link, container.lastChild);
});
