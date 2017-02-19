function scrollTo(section)
{
    $('html, body').animate({
        scrollTop: section.offset().top
    }, 500);
}

$(document).ready(function() {
    var content = $('#content'),
        baseTemp = $('#base-template', content),
        endTemp = $('#endpoint-template', content),
        faTemp = $('#fa-template', content),
        toc = $('#toc', content),
        btt = $('#back-to-top'),
        baseUrl = 'https://beta.decapi.me',
        baseEndpoints = [];

    btt.on('click', function() {
        scrollTo($('body'));
        window.location.hash = '';
    });

    $('span#base_url').html(baseUrl);

    $.get({
        url: './yaml/base/base_endpoints.yaml',
        type: 'GET',
        dataType: 'text',
        success: function(data) {
            data = jsyaml.load(data);
            baseEndpoints = data;

            $.each(data, function(k, base) {
                var temp = baseTemp.clone();
                temp.attr('id', base.name);
                $('.page-header i', temp).addClass('fa-' + (base.icon || 'info'));
                $('.page-header span', temp).html(base.title);
                temp.removeClass('hidden');

                temp.appendTo(content);

                var icon = faTemp
                    .clone()
                    .addClass('fa-fw fa-' + (base.icon || 'info'))
                    .removeClass('hidden')
                    .get(0)
                    .outerHTML;

                $('<a/>')
                    .addClass('list-group-item')
                    .attr('href', '#' + base.name)
                    .data('section', base.name)
                    .html(icon + ' ' + base.title)
                    .appendTo($('.list-group', toc));

                loadEndpoint(base.name);
            });

            $('a', toc).on('click', function() {
                var section = $(this).data('section');

                if (section.length > 0) {
                    scrollTo($('#' + section));
                }
            });

            toc.removeClass('hidden');
        },
        error: function(err) {
            $('<div/>')
                .addClass('alert alert-warning')
                .html('There was an error loading the endpoint data. Try again later.')
                .appendTo(content);
        }
    });

    function loadEndpoint(base)
    {
        $.get({
            url: './yaml/endpoints/' + base + '.yaml',
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                data = jsyaml.load(data);
                var div = $('#' + base);

                $.each(data.endpoints, function(k, end) {
                    var panel = endTemp.clone(),
                        title = $('#title', panel),
                        body = $('#main-body', panel),
                        description = $('#description', body),
                        routes = $('#route-body', panel),
                        qs = $('#qs-body', panel);

                    var panelId = base + '_' + end.route
                        .replace(new RegExp('/', 'g'), '_')
                        .replace(new RegExp('({)|(})', 'g'), '');

                    $('a', title).attr('href', '#' + panelId);
                    var route = end.route === '' ? '' : '/' + end.route;
                    $('a #base', title).html(data.base_path + (end.route === '' ? '' : '/'));
                    $('a #route', title).html(end.route);

                    $.each(end.notes, function(k, note) {
                        $('<li/>')
                            .addClass('list-group-item')
                            .html(note)
                            .appendTo(description);
                    });

                    var method = end.method ? end.method.toUpperCase() : 'GET';
                    $('pre#http strong', body).html(method);
                    $('pre#http code', body).html(baseUrl + data.base_path + route);

                    if (method === 'GET') {
                        var bots = $('#bots', body);
                        bots.removeClass('hidden');
                        $('#url', bots).html(baseUrl + data.base_path + route);
                    }

                    // Route parameters
                    if (end.parameters && end.parameters.length > 0) {
                        $('#routes', panel).removeClass('hidden');
                        $.each(end.parameters, function(k, param) {
                            var row = $('<tr/>');
                            var required = faTemp
                                .clone()
                                .addClass(param.optional ? 'fa-times' : 'fa-check')
                                .removeClass('hidden');

                            // Parameter name
                            $('<th/>')
                                .html(param.name)
                                .appendTo(row);

                            // Parameter description
                            $('<td/>')
                                .html(param.description)
                                .appendTo(row);

                            // Parameter required/optional
                            $('<td/>')
                                .html(required)
                                .appendTo(row);

                            // Parameter type
                            $('<td/>')
                                .html('<code>' + (param.type || 'string') + '</code>')
                                .appendTo(row);

                            row.appendTo($('tbody', routes));
                        });
                    }

                    // Query string parameters
                    if (end.qs && end.qs.length > 0) {
                        $('#qs', panel).removeClass('hidden');

                        $.each(end.qs, function(k, param) {
                            var row = $('<tr/>');
                            var required = faTemp
                                .clone()
                                .addClass(param.required ? 'fa-check' : 'fa-times')
                                .removeClass('hidden');

                            // Parameter name
                            $('<th/>')
                                .html(param.name)
                                .appendTo(row);

                            // Parameter description
                            $('<td/>')
                                .html(param.description)
                                .appendTo(row);

                            // Parameter required/optional
                            $('<td/>')
                                .html(required)
                                .appendTo(row);

                            // Parameter type
                            $('<td/>')
                                .html('<code>' + (param.type || 'string') + '</code>')
                                .appendTo(row);

                            row.appendTo($('tbody', qs));
                        });
                    }

                    panel.removeClass('hidden');
                    panel.attr('id', panelId);
                    panel.appendTo(div);
                });

                doneLoading(base);
            },
            error: function() {
                doneLoading(base);
            }
        });
    }

    function doneLoading(base)
    {
        var max = baseEndpoints.length - 1;
        // Only scroll if this is the last endpoint loaded.
        if (baseEndpoints[max].name !== base) {
            return;
        }

        var hash = window.location.hash.replace('#', '');

        if (hash.trim() !== '') {
            var section = $('#' + hash);
            if (section.length > 0) {
                scrollTo(section);
            }
        }

        // Handle internal links that link to certain sections on
        // the same page and add smooth scrolling to said section.
        $('a').on('click', function() {
            var section = $(this).attr('href');

            if (section.indexOf('#') === 0) {
                scrollTo($(section));
            }
        });
    }
});
