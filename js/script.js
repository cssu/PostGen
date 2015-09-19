var elTitle       = document.getElementById('post_title'),
    elDescription = document.getElementById('post_description'),
    elAuthor      = document.getElementById('post_author'),
    elDate        = document.getElementById('post_date'),
    elExpiry      = document.getElementById('post_expiry'),
    elTags        = document.getElementById('post_tags'),
    elContent     = document.getElementById('post_content'),
    elTypeNews    = document.getElementById('post_type_news'),
    elTypeEvent   = document.getElementById('post_type_events'),
    elPreview     = document.getElementById('post_preview');

document.getElementById('post_generate').addEventListener('click', function (e) {
    e.preventDefault();

    elPreview.value = [
        '---',
        'layout: post',
        'title: ' + elTitle.value,
        elTypeNews.checked ? 'author: ' + elAuthor.value : 'description: ' + elDescription.value,
        'date: ' + elDate.value,
        elTypeEvent.checked ? 'expiry: ' + elExpiry.value : '',
        'categories: ' + (elTypeNews.checked ? 'news' : 'events'),
        'tags: ' + elTags.value,
        '---',
        '',
        elContent.value
    ].join('\n');
});

var toggleTypeFields = function () {
    document.getElementById('post_news_author').style.display = elTypeNews.checked ? 'block' : 'none';

    document.getElementById('post_event_description').style.display = elTypeEvent.checked ? 'block' : 'none';
    document.getElementById('post_event_expiry').style.display = elTypeEvent.checked ? 'block' : 'none';
};

toggleTypeFields();

elTypeNews.addEventListener('change', toggleTypeFields);
elTypeEvent.addEventListener('change', toggleTypeFields);

var downloadFile = function (filename, text) {
    var link = document.createElement('a');
    link.setAttribute('target', '_blank');

    if (Blob !== undefined) {
        var blob = new Blob([text], { type: 'text/plain' });
        link.setAttribute('href', URL.createObjectURL(blob));
    } else {
        link.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
    }

    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

document.getElementById('post_download').addEventListener('click', function () {
    var filename = elDate.value + '-' + elTitle.value.split(' ').join('-') + '.md';

    downloadFile(filename, elPreview.value);
});
