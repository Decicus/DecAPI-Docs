$(document).ready(function() {
    var content = $('#content'),
        baseTemp = $('#base-template', content),
        endTemp = $('#endpoint-template', content),
        faTemp = $('#fa-template', content),
        toc = $('#toc', content),
        baseUrl = 'https://beta.decapi.me';

    $.get({
        url: './data/base.min.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
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
                    .html(icon + ' ' + base.title)
                    .appendTo($('.list-group', toc));
            });

            toc.removeClass('hidden');
            loadEndpoints();
        },
        error: function(err) {
            $('<div/>')
                .addClass('alert alert-warning')
                .html('There was an error loading the endpoint data. Try again later.')
                .appendTo(content);
        }
    });

    function loadEndpoints()
    {
        $.get({
            url: './data/endpoints.min.json',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $.each(data, function(id, info) {
                    var div = $('#' + id);

                    $.each(info.endpoints, function(k, end) {
                        var panel = endTemp.clone(),
                            title = $('#title', panel),
                            body = $('#main-body', panel),
                            description = $('#description', body),
                            routes = $('#route-body', panel),
                            qs = $('#qs-body', panel);

                        $('#base a', title)
                            .attr('href', '#' + id)
                            .html(info.base_path + '/');
                        $('#route', title).html(end.route);

                        $.each(end.notes, function(k, note) {
                            $('<li/>')
                                .addClass('list-group-item')
                                .html(note)
                                .appendTo(description);
                        });

                        $('pre strong', body).html(end.method || 'GET');
                        $('pre code', body).html(baseUrl + info.base_path + '/' + end.route);

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
                        panel.appendTo(div);
                    });
                });
            }
        });
    }
});
