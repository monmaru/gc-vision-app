'use strict';
$(function() {
  $('#file').on('change', onFileChanged);
  $('#analyze').on('click', onAnalyzeClicked);
});

function onFileChanged(e) {
  var file = e.target.files[0];
  resetAnalysisResult();

  if (file) {
    readImage(file);
  } else {
    resetImage();
  }
}

function readImage(file) {
  var filereader = new FileReader();
  filereader.readAsDataURL(file);
  filereader.onload = function(e) {
     $('#image').attr('src', e.target.result);
  };
}

function resetImage() {
  $('#image').attr('src', '');
}

function resetAnalysisResult() {
  $('#analysis-result').remove();
}

function onAnalyzeClicked() {
  var encodedFile = $('#image').attr('src');
  if (!encodedFile || encodedFile === '') {
    Materialize.toast('画像ファイルを選択してください！！', 3000);
  } else {
    analyze(encodedFile);
  }
}

function analyze(encodedFile) {
  var $loading = $('#loading');
  resetAnalysisResult();
  $loading.show();

  var onSuccess = function(data, textStatus, jqXHR) {
    $loading.hide();
    var pre = $('<pre>').appendTo($('#result-container')).attr('id', 'analysis-result');
    $('<code>').addClass('json').appendTo(pre).text(JSON.stringify(data, null, 2));
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };

  var onError = function(jqXHR, textStatus, errorThrown) {
    $loading.hide();
    alert('ERRORS: ' + textStatus + ' ' + errorThrown);
  }

  $.ajax({
    type: 'POST',
    url: '/api/vision',
    dataType: 'json',
    data: JSON.stringify({ 'image': encodedFile }),
    headers: { "Content-Type": "application/json" },
    success: onSuccess,
    error: onError
  });
}
