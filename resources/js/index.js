import {driver} from "driver.js";

document.addEventListener('livewire:initialized', async function () {

    let highlights = [];

    Livewire.dispatch('driverjs::load-elements', {request: window.location});


    Livewire.on('driverjs::loaded-elements', function (data) {

        console.log(data);
        data[0].tours.forEach((tour) => {
            if (!localStorage.getItem('tours')) {
                localStorage.setItem('tours', "[]");
            }
            if (tour.open) {
                if(!data[0].only_visible_once) {
                    openTour(tour);
                } else if(!localStorage.getItem('tours').includes(tour.id)) {
                    openTour(tour);
                } else if(tour.alwaysShow) {
                    openTour(tour);
                }
            }
        });

        data[0].highlights.forEach((highlight) => {
            highlights.push(highlight);

            if (document.querySelector(highlight.parent)) {
                parent = document.querySelector(highlight.parent);

                parent.parentNode.style.position = 'relative';

                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = highlight.button;

                tempDiv.firstChild.classList.add(highlight.position);

                parent.parentNode.insertBefore(tempDiv.firstChild, parent)
                // parent.innerHTML += highlight.button;
            }
        });
    });

    Livewire.on('driverjs::open-highlight', function (highlight) {
        let highlightElement = highlights.find(element => element.id === highlight.highlight);

        if (highlightElement) {


            driver({
                overlayColor: localStorage.theme === 'light' ? highlightElement.colors.light : highlightElement.colors.dark,

                onPopoverRender: (popover, {config, state}) => {
                    popover.title.innerHTML = "";
                    popover.title.innerHTML = state.activeStep.popover.title;

                    if (!state.activeStep.popover.description) {
                        popover.title.firstChild.style.justifyContent = 'center';
                    }

                    let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";

                    popover.footer.parentElement.classList.add(...contentClasses.split(" "));
                },
            }).highlight(highlightElement);
        }
    });

    Livewire.on('driverjs::open-tour', function (tour) {
        openTour(tour[0]);
    });

    function openTour(tour) {
        if (tour.steps.length > 0) {

            const driverObj = driver({
                allowClose: true,
                disableActiveInteraction: true,
                overlayColor: localStorage.theme === 'light' ? tour.colors.light : tour.colors.dark,
                onDeselected: ((element, step, {config, state}) => {
                }),
                onCloseClick: ((element, step, {config, state}) => {
                    if (state.activeStep && !state.activeStep.popover.unclosable)
                        driverObj.destroy();

                    if (!localStorage.getItem('tours').includes(tour.id)) {
                        localStorage.setItem('tours', JSON.stringify([...JSON.parse(localStorage.getItem('tours')), tour.id]));
                    }
                }),
                onDestroyStarted: ((element, step, {config, state}) => {
                    if (state.activeStep && !state.activeStep.popover.unclosable) {
                        driverObj.destroy();
                    }
                }),
                onDestroyed: ((element, step, {config, state}) => {

                }),
                onNextClick: ((element, step, {config, state}) => {

                    if (driverObj.isLastStep()) {

                        if (!localStorage.getItem('tours').includes(tour.id)) {
                            localStorage.setItem('tours', JSON.stringify([...JSON.parse(localStorage.getItem('tours')), tour.id]));
                        }

                        driverObj.destroy();
                    }

                    if (step.popover.onNextNotify) {
                        new FilamentNotification()
                            .title(step.popover.onNextNotify.title)
                            .body(step.popover.onNextNotify.body)
                            .icon(step.popover.onNextNotify.icon)
                            .iconColor(step.popover.onNextNotify.iconColor)
                            .color(step.popover.onNextNotify.color)
                            .duration(step.popover.onNextNotify.duration)
                            .send();
                    }

                    if (step.popover.onNextDispatch) {
                        Livewire.dispatch(step.popover.onNextDispatch.name, JSON.parse(step.popover.onNextDispatch.args))
                    }

                    if (step.popover.onNextClickSelector) {
                        document.querySelector(step.popover.onNextClickSelector).click();
                    }

                    if (step.redirect) {
                        window.open(step.redirect.url, step.redirect.newTab ? '_blank' : '_self');
                    }

                    driverObj.moveNext();
                }),
                onPopoverRender: (popover, {config, state}) => {
                    if (state.activeStep.popover.unclosable)
                        document.querySelector(".driver-popover-close-btn").remove();

                    popover.title.innerHTML = "";
                    popover.title.innerHTML = state.activeStep.popover.title;

                    if (!state.activeStep.popover.description) {
                        popover.title.firstChild.style.justifyContent = 'center';
                    }

                    let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";

                    popover.footer.parentElement.classList.add(...contentClasses.split(" "));

                    popover.footer.innerHTML = "";
                    popover.footer.classList.add('flex', 'mt-3');
                    popover.footer.style.justifyContent = 'space-evenly';

                    popover.footer.classList.remove("driver-popover-footer");


                    const nextButton = document.createElement("button");
                    let nextClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";

                    nextButton.classList.add(...nextClasses.split(" "), 'driver-popover-next-btn');
                    nextButton.innerText = driverObj.isLastStep() ? "Terminer" : "Suivant";

                    nextButton.style.setProperty('--c-400', 'var(--primary-400');
                    nextButton.style.setProperty('--c-500', 'var(--primary-500');
                    nextButton.style.setProperty('--c-600', 'var(--primary-600');

                    const prevButton = document.createElement("button");
                    let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
                    prevButton.classList.add(...prevClasses.split(" "), 'driver-popover-prev-btn');
                    prevButton.innerText = "Précédent";

                    const exitButton = document.createElement("button");
                    let exitClasses = "fi-btn fi-btn-size-sm relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-danger gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";
                    exitButton.classList.add(...exitClasses.split(" "));
                    exitButton.innerText = "Quitter";

                    exitButton.style.setProperty('--c-400', 'var(--danger-400)');
                    exitButton.style.setProperty('--c-500', 'var(--danger-500');
                    exitButton.style.setProperty('--c-600', 'var(--danger-600');

                    exitButton.addEventListener('click', () => {
                        driverObj.destroy();
                    });

                    if (!driverObj.isLastStep() && !state.activeStep.popover.unclosable) {
                        popover.footer.appendChild(exitButton);
                    }

                    if (!driverObj.isFirstStep()) {
                        popover.footer.appendChild(prevButton);
                    }
                    popover.footer.appendChild(nextButton);
                },
                steps:
                    JSON.parse(tour.steps),
            });

            driverObj.drive();
        }
    }
});

