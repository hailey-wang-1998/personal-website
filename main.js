document.addEventListener('DOMContentLoaded', function () {


  // ==========================================
  // SMOOTH SCROLL
  // ==========================================

  const links =
    document.querySelectorAll('a[href^="#"]');


  links.forEach(function (link) {

    link.addEventListener(
      'click',
      function (event) {

        const href =
          link.getAttribute('href');


        if (
          !href ||
          href === '#'
        ) {
          return;
        }


        const target =
          document.querySelector(href);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: 'smooth'
        });

      }
    );

  });



  // ==========================================
  // GARDEN ELEMENTS
  // ==========================================

  const grassField =
    document.getElementById(
      'grass-field'
    );


  const plantButtons =
    document.querySelectorAll(
      '.plant-option'
    );


  const instruction =
    document.getElementById(
      'garden-instruction'
    );


  const clearButton =
    document.getElementById(
      'clear-garden'
    );



  // ==========================================
  // SAFETY CHECK
  // ==========================================

  if (
    !grassField ||
    !instruction ||
    !clearButton
  ) {

    console.log(
      'Garden elements not found.'
    );

    return;

  }



  // ==========================================
  // CURRENT SELECTION
  // ==========================================

  let selectedPlant = null;



  // ==========================================
  // SAVED PLANTS
  // ==========================================

  let savedPlants = [];


  try {

    const saved =
      localStorage.getItem(
        'haileyGardenPlants'
      );


    if (saved) {

      savedPlants =
        JSON.parse(saved);

    }

  } catch (error) {

    console.log(
      'Could not load garden.',
      error
    );

    savedPlants = [];

  }



  // ==========================================
  // LOAD EXISTING PLANTS
  // ==========================================

  savedPlants.forEach(
    function (plantData) {

      createPlant(
        plantData,
        false
      );

    }
  );


  updateInstruction();



  // ==========================================
  // SELECT FLOWER
  // ==========================================

  plantButtons.forEach(
    function (button) {

      button.addEventListener(
        'click',
        function () {

          selectedPlant =
            button.dataset.flower;


          plantButtons.forEach(
            function (otherButton) {

              otherButton.classList.remove(
                'selected'
              );

            }
          );


          button.classList.add(
            'selected'
          );


          instruction.style.display =
            'block';


          instruction.textContent =
            'now click anywhere on the grass';

        }
      );

    }
  );



  // ==========================================
  // CLICK GRASS
  // ==========================================

  grassField.addEventListener(
    'click',
    function (event) {


      if (!selectedPlant) {

        instruction.style.display =
          'block';


        instruction.textContent =
          'pick one below first';


        return;

      }



      const rect =
        grassField.getBoundingClientRect();


      const clickX =
        event.clientX -
        rect.left;


      const clickY =
        event.clientY -
        rect.top;


      const plantData = {

        type:
          selectedPlant,

        x:
          clickX /
          rect.width,

        y:
          clickY /
          rect.height

      };



      savedPlants.push(
        plantData
      );


      savePlants();


      createPlant(
        plantData,
        true
      );


      instruction.style.display =
        'none';

    }
  );



  // ==========================================
  // CREATE PLANT
  // ==========================================

  function createPlant(
    plantData,
    animate
  ) {

    const plant =
      document.createElement(
        'div'
      );


    plant.classList.add(
      'planted-item'
    );


    plant.classList.add(
      plantData.type
    );


    plant.style.left =
      `${plantData.x * 100}%`;


    plant.style.top =
      `${plantData.y * 100}%`;



    // ========================================
    // SUNFLOWER
    // ========================================

    if (
      plantData.type ===
      'sunflower'
    ) {

      plant.innerHTML = `

        <div class="sunflower-head">

          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>
          <span class="sunflower-petal"></span>

          <span class="sunflower-center"></span>

        </div>

        <span class="stem"></span>

        <span class="leaf leaf-left"></span>

        <span class="leaf leaf-right"></span>

      `;

    }



    // ========================================
    // TULIP
    // ========================================

    else if (
      plantData.type ===
      'tulip'
    ) {

      plant.innerHTML = `

        <div class="tulip-head">

          <span class="tulip-petal left"></span>

          <span class="tulip-petal right"></span>

          <span class="tulip-petal middle"></span>

        </div>

        <span class="stem"></span>

        <span class="leaf leaf-left"></span>

        <span class="leaf leaf-right"></span>

      `;

    }



    // ========================================
    // PURPLE FLOWER
    // ========================================

    else if (
      plantData.type ===
      'purple'
    ) {

      plant.innerHTML = `

        <div class="purple-head">

          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>
          <span class="purple-bloom"></span>

        </div>

        <span class="stem"></span>

        <span class="leaf leaf-left"></span>

        <span class="leaf leaf-right"></span>

      `;

    }



    // ========================================
    // GRASS
    // ========================================

    else if (
      plantData.type ===
      'grass'
    ) {

      plant.innerHTML = `

        <span class="plant-grass-blade"></span>

        <span class="plant-grass-blade"></span>

        <span class="plant-grass-blade"></span>

        <span class="plant-grass-blade"></span>

        <span class="plant-grass-blade"></span>

      `;

    }



    // Saved plants should not grow again

    if (!animate) {

      plant.classList.add(
        'no-animation'
      );

    }



    grassField.appendChild(
      plant
    );

  }



  // ==========================================
  // SAVE
  // ==========================================

  function savePlants() {

    try {

      localStorage.setItem(
        'haileyGardenPlants',
        JSON.stringify(
          savedPlants
        )
      );

    } catch (error) {

      console.log(
        'Could not save garden.',
        error
      );

    }

  }



  // ==========================================
  // INSTRUCTION
  // ==========================================

  function updateInstruction() {

    if (
      savedPlants.length > 0
    ) {

      instruction.style.display =
        'none';

    } else {

      instruction.style.display =
        'block';


      instruction.textContent =
        'pick one below, then click the grass';

    }

  }



  // ==========================================
  // RESET
  // ==========================================

  clearButton.addEventListener(
    'click',
    function () {

      savedPlants = [];


      selectedPlant = null;


      try {

        localStorage.removeItem(
          'haileyGardenPlants'
        );

      } catch (error) {

        console.log(
          'Could not clear garden.',
          error
        );

      }


      const existingPlants =
        grassField.querySelectorAll(
          '.planted-item'
        );


      existingPlants.forEach(
        function (plant) {

          plant.remove();

        }
      );


      plantButtons.forEach(
        function (button) {

          button.classList.remove(
            'selected'
          );

        }
      );


      instruction.style.display =
        'block';


      instruction.textContent =
        'pick one below, then click the grass';

    }
  );

});

(() => {
  const grids = document.querySelectorAll(".projects-grid");

  grids.forEach((grid) => {
    const projects = Array.from(grid.children).filter(
      (el) => el.classList.contains("project")
    );

    function layout() {
      const viewport = window.innerWidth;

      let columns = grid.classList.contains("narratives-grid")
        ? 4
        : 5;

      if (viewport <= 1100) columns = 3;
      if (viewport <= 750) columns = 2;
      if (viewport <= 450) columns = 1;

      const gapX = viewport <= 750 ? 10 : 15;
      const gapY = viewport <= 750 ? 10 : 16;

      const width = grid.clientWidth;
      const columnWidth =
        (width - gapX * (columns - 1)) / columns;

      const heights = Array(columns).fill(0);

      grid.classList.add("horizontal-masonry");

      projects.forEach((project) => {
        project.style.width = `${columnWidth}px`;
      });

      projects.forEach((project, index) => {
        const column = index % columns;

        project.style.left =
          `${column * (columnWidth + gapX)}px`;

        project.style.top = `${heights[column]}px`;

        heights[column] += project.offsetHeight + gapY;
      });

      grid.style.height =
        `${Math.max(0, ...heights) - (projects.length ? gapY : 0)}px`;
    }

    let frame;

    function scheduleLayout() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(layout);
    }

    const observer = new ResizeObserver(scheduleLayout);

    projects.forEach((project) => {
      observer.observe(project);
    });

    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("load", scheduleLayout);

    if (document.fonts) {
      document.fonts.ready.then(scheduleLayout);
    }

    scheduleLayout();
  });
})();