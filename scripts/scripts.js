'use strict';

addEventListener('DOMContentLoaded', (event) =>
{
    let algos = document.querySelectorAll('.algorithm');

    algos.forEach((algo) =>
    {
        // * Pseudo code hack
        algo.querySelectorAll('section.pseudocode .sb').forEach((sb) => {
            // * strip the quotes from anything quoted with backticks``
            //   (we will treat these as natural language statements
            sb.innerHTML = sb.innerHTML.slice(1, -1)
        });

        // * Add a container for the tab buttons
        let algoTitle = algo.querySelector('h3')

        let tabs = document.createElement('div');
        tabs.className = 'tabs';
        algoTitle.after(tabs);

        let sections = algo.querySelectorAll('section');
        for (const [index, section] of sections.entries())
        {
            let h4 = section.querySelector('h4')
            name = h4.innerHTML;
            h4.classList.add('hidden');

            let tab = document.createElement('button');
            tab.innerHTML = name

            tabs.append(tab)

            active(tab, index == 0);
            active(section, index == 0);

            tab.addEventListener('click', function(event)
            {
                algo.querySelectorAll('.tabs button').forEach((tab) => {
                    active(tab, false);
                });

                sections.forEach((section) => {
                   active(section, false);
                });

                active(tab, true)
                active(section, true);
            });
        }

    });
});

function active(node, bln){
    if(bln)
    {
        node.classList.add('active');
        node.classList.remove('inactive');
    } else {
        node.classList.add('inactive');
        node.classList.remove('active');
    }

}