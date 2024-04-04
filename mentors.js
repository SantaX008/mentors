function update_info() {
    let media_query = window.matchMedia('(min-width: 768px)');

    if (media_query.matches) {
        document.querySelectorAll('.mentors-list-item details').forEach(e => e.open = false);
    } else {
        document.querySelectorAll('.mentors-list-item details').forEach(e => e.open = true);
    }
}

window.addEventListener('load', () => {
    update_info();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);


    let reset_form = () => {
        document.querySelectorAll('.mentors-page-tag-list input').forEach(e => {
            change_tag(e, false, true);
        });
        checked_count();
        mentors_count();
    }

    let checked_count = () => {
        let count = document.querySelectorAll(".mentors-page-tag-list input[type='checkbox']:checked").length;
        if (count) {
            document.querySelector('.js-show-popup span').textContent = count;
            document.querySelector('.js-show-popup span').classList.add('show');
            document.querySelector('.js-reset-btn').classList.add('show');
        } else {
            document.querySelector('.js-show-popup span').classList.remove('show');
            document.querySelector('.js-show-popup span').textContent = '';
            document.querySelector('.js-reset-btn').classList.remove('show');
        }
    }

    let mentors_count = () => {
        let count = document.querySelectorAll(".mentors-list-item.show").length;
        if (count) {
            document.querySelector('.js-show-btn').value = `Показать менторов (${count})`;
        } else {
            document.querySelector('.js-show-btn').value = 'Показать менторов';

        }
    }


    for (const key of urlParams.keys()) {
        let arr = document.querySelectorAll('.mentors-page-tag-list-item input');
        arr.forEach(e => {
            if (e.value === key) {
                e.setAttribute('checked', true);
            }
        })
    }

    let filter = function(search_str) {
        document.querySelectorAll('.mentors-list-item').forEach(e => {
            e.classList.remove('show');

            e.querySelectorAll('.mentors-list-item__tag-list-item').forEach(el => {
                if (search_str.indexOf(el.dataset.direction) !== -1) {
                    e.classList.add('show');
                }
            });
        });
    }

    let change_tag = function (e, load, reset) {
        if (!load) {
            e.checked ? urlParams.append(e.value, e.value) : urlParams.delete(e.value, e.value);
        }

        if (reset) {
            urlParams.delete(e.value, e.value);
            e.checked = false;
        }

        let entries = urlParams.entries();
        let search_str = '?';
        // console.log(Array.from(urlParams).length)
        if (Array.from(urlParams).length) {
            for(const entry of entries) {
                search_str += `${entry[0]}=${entry[1]}&`
            }
            history.pushState(null, null, search_str.slice(0, -1));
            filter(search_str);

        } else {
            history.pushState(null, null, '?');

            document.querySelectorAll('.mentors-list-item').forEach(e => {
                e.classList.add('show');
            });
        }

    }

    document.querySelectorAll('.mentors-page-tag-list input').forEach(e => {
        change_tag(e, true);

        e.addEventListener('change', () => {
            change_tag(e);
            checked_count();
            mentors_count();
        });
    });

    checked_count();
    mentors_count();

    document.querySelector('.js-reset-btn').addEventListener('click', function () {
        reset_form();
    })

});

window.addEventListener('resize', () => {
    update_info();
});

document.querySelector('.js-show-popup').addEventListener('click', () => {
    document.querySelector('body').classList.add('popup-open');
});


document.querySelectorAll('.js-close').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('body').classList.remove('popup-open');
    });
});

