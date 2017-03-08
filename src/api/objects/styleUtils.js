
let StyleUtils = new function () {};

StyleUtils.prototype.createRibbon = function(divId, ribbonText) {
  $(divId).html('<div class="ribbon"><span>' + ribbonText + '</span></div>');
};

StyleUtils.prototype.clearContainerInputs = function () {
  $(".disabled")
    .off()
    .on("keydown",
      function (event) {
        event.preventDefault();
      });
};

StyleUtils.prototype.clearInputsInsideDiv = function (divSelector) {
  $(divSelector).find('input:text').val('');
};

StyleUtils.prototype.setInputValue = function (inputSelector, val) {
  $(inputSelector).val(val);
};

StyleUtils.prototype.toggleSelectorEnable = function (selectorId, disabled) {
  $(selectorId).attr('disabled', disabled);
};

StyleUtils.prototype.addSelectorClass = function (selectorId, classToAdd) {
  $(selectorId).addClass(classToAdd);
};

StyleUtils.prototype.removeSelectorClass = function (selectorId, classToRemove) {
  $(selectorId).removeClass(classToRemove);
};

StyleUtils.prototype.updateButtonContents = function (buttonSelector, text, styleToRemove, styleToAdd) {
  if (text !== null && text !== undefined && text.length > 0) {
    $(buttonSelector).text(text);
  }

  $(buttonSelector).removeClass(styleToRemove);
  $(buttonSelector).addClass(styleToAdd);
};

export default StyleUtils;

