let searchFunc = function (path, search_id, content_id) {
  // 0x00. environment initialization
  'use strict';
  let nfound = document.getElementById("nfound").innerHTML
  let ninit = document.getElementById("ninit").innerHTML
  let $input = document.getElementById(search_id);
  let $resultContent = document.getElementById(content_id);
  $resultContent.innerHTML = "<ul><span class='local-search-empty'>" + ninit + "<span></ul>";
  $.ajax({
    // 0x01. load xml file
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {
      // 0x02. parse xml file
      let datas = $("entry", xmlResponse).map(function () {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();
      $resultContent.innerHTML = "";

      $input.addEventListener('input', function () {
        // 0x03. parse query to keywords list
        let str = '<ul class=\"search-result-list\">';
        let keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        // 0x04. perform local searching
        datas.forEach(function (data) {
          let isMatch = true;
          let content_index = [];
          if (!data.title || data.title.trim() === '') {
            data.title = "Untitled";
          }
          let orig_data_title = data.title.trim();
          let data_title = orig_data_title.toLowerCase();
          let orig_data_content = data.content.trim().replace(/<[^>]+>/g, "");
          let data_content = orig_data_content.toLowerCase();
          let data_url = data.url;
          let index_title = -1;
          let index_content = -1;
          let first_occur = -1;
          // only match artiles with not empty contents
          if (data_content !== '') {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i == 0) {
                  first_occur = index_content;
                }
                // content_index.push({index_content:index_content, keyword_len:keyword_len});
              }
            });
          } else {
            isMatch = false;
          }
          // 0x05. show search results
          if (isMatch) {
            str += "<li><a href='" + data_url + "' class='search-result-title' target='_blank'><div>" + orig_data_title + "</div></a>";
            let content = orig_data_content;
            if (first_occur >= 0) {
              // cut out 100 characters
              let start = first_occur - 20;
              let end = first_occur + 80;

              if (start < 0) {
                start = 0;
              }

              if (start == 0) {
                end = 100;
              }

              if (end > content.length) {
                end = content.length;
              }

              let match_content = content.substr(start, end);

              // highlight all keywords
              keywords.forEach(function (keyword) {
                let regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
              });

              str += "<p class=\"search-result\">" + match_content + "...</p>"
            }
            str += "</li>";
          }
        });
        str += "</ul>";
        if (str.indexOf('<li>') === -1) {
          return $resultContent.innerHTML = "<ul><span class='local-search-empty'>" + nfound + "<span></ul>";
        }
        $resultContent.innerHTML = str;
      });
    }
  });
  $(document).on('click', '#local-search-close', function() {
    $('#local-search-input').val('');
    $('local-search-result').html('');
  });
}

let getSearchFile = function(){
    let path = "/search.xml";
    searchFunc(path, 'local-search-input', 'local-search-result');
}
