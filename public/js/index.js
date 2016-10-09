'use strict';
$(function() {
  $('#file').on('change', onFileChanged);
  $('#analyze').on('click', analyze);
});

function onFileChanged(e) {
  var file = e.target.files[0];
  var filereader = new FileReader();

  $('#analysis-result').remove();

  if (file) {
    filereader.readAsDataURL(file);
    filereader.onload = function(e) {
      $('#image').attr('src', e.target.result);
    };
  } else {
    $('#image').attr('src', '');
  }
}

function analyze() {
  var encodedFile = $('#image').attr('src'); 
  if (!encodedFile || encodedFile === '') {
    Materialize.toast('画像ファイルを選択してください！！', 3000);
  } else {
    $('#loading').show();
    $.ajax({
      type: 'POST',
      url: '/api/vision',
      dataType: 'json',
      data: JSON.stringify({ 'image': encodedFile }),
      headers: { "Content-Type": "application/json" },
      success: function(data, textStatus, jqXHR) {
        $('#loading').hide();
        var pre = $('<pre>').appendTo($('#result-container')).attr('id', 'analysis-result');
        $('<code>').addClass('json').appendTo(pre).text(JSON.stringify(data, null, 2));
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('#loading').hide();
        alert('ERRORS: ' + textStatus + ' ' + errorThrown);
      }
    });
  }
}
