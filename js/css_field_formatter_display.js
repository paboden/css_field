(function ($) {

  Drupal.behaviors.css_field_display = {
    attach: function (context, settings) {
      // Load and init ace editor asynchronous to support ajax forms.
      $.getScript('//cdn.jsdelivr.net/ace/1.1.6/noconflict/ace.js', function(data, textStatus, jqxhr ) {
        $('.field-type-css-field textarea').each(function () {
          var textarea = $(this);
          textarea.removeAttr('data-ace-editor');

          // Hide Drupal textarea.
          textarea.siblings('.grippie').hide();

          var editDiv = $('<div>', {
            width: '100%',
            'class': textarea.attr('class')
          }).css('min-height', textarea.height())
            .insertBefore(textarea);

          textarea.addClass('element-invisible');
          // Init ace editor.
          var theme = Drupal.settings.css_field.readonlyTheme;
          var editor = ace.edit(editDiv[0]);
          editor.getSession().setValue(textarea.val());
          editor.getSession().setMode('ace/mode/css');
          editor.getSession().setTabSize(2);
          editor.setTheme('ace/theme/' + theme);
          editor.setReadOnly(true);
          editor.setOptions({
            minLines: 1,
            maxLines: 100
          });

          // Update Drupal textarea value.
          editor.getSession().on('change', function(){
            textarea.val(editor.getSession().getValue());
          });
        });
      });
    }
  };

})(jQuery);
