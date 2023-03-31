const adjectives = [
    "Artificial",
    "Active",
    "Applied",
    "Augmented",
    "Advanced",
    "Autonomous",
    "Big",
    "Creative",
    "Connected",
    "Cyber",
    "Conversational",
    "Deep",
    "Digital",
    "Distributed",
    "Dynamic",
    "Edge",
    "Efficient",
    "Elastic",
    "Emerging",
    "Enhanced",
    "Extended",
    "Experimental",
    "Flexible",
    "Full-stack",
    "Generative",
    "High-tech",
    "Holistic",
    "Human",
    "Hybrid",
    "Hyper",
    "Interactive",
    "Immersive",
    "Kinetic",
    "Local",
    "Low",
    "Main",
    "Meta",
    "Micro",
    "Mobile",
    "Modular",
    "Multi",
    "Mixed",
    "Native",
    "Next",
    "Next-gen",
    "Neural",
    "Open",
    "Optical",
    "Progressive",
    "Private",
    "Parallel",
    "Portable",
    "Public",
    "Quantum",
    "Quantitative",
    "Reactive",
    "Responsive",
    "Remote",
    "Robust",
    "Robotic",
    "Realtime",
    "Secure",
    "Serverless",
    "Shared",
    "Smart",
    "Spatial",
    "Scalable",
    "Sustainable",
    "Universal",
    "User",
    "Virtual",
    "Visual",
    "Wireless",
];

const technologies = [
    "5G",
    "App",
    "Application",
    "Algorithm",
    "Automation",
    "Analytics",
    "Architecture",
    "Automation",
    "Blockchain",
    "Bot",
    "Cloud",
    "Computing",
    "Container",
    "Data",
    "DevOps",
    "Encription",
    "Engine",
    "Framework",
    "Gateway",
    "Graph",
    "Interface",
    "Infrastructure",
    "Intelligence",
    "Machine",
    "Model",
    "Net",
    "Network",
    "Orchestration",
    "Operating",
    "Platform",
    "Programming",
    "Prototype",
    "Protocol",
    "Process",
    "Robotics",
    "Security",
    "Software",
    "Storage",
    "System",
    "Tech",
    "Virtualisation",
    "Webservice",
    "Web",
    "Web-App",
];

const nouns = [
    "Architect",
    "Agent",
    "Analyst",
    "Builder",
    "Catalyst",
    "Coder",
    "Connoisseur",
    "Connector",
    "Composer",
    "Crafter",
    "Creator",
    "Curator",
    "Designer",
    "Dev",
    "Developer",
    "Director",
    "Expert",
    "Engineer",
    "Explorer",
    "Facilitator",
    "Founder",
    "Innovator",
    "Inventor",
    "Leader",
    "Maker",
    "Master",
    "Manager",
    "Operator",
    "Orchestrator",
    "Organiser",
    "Pioneer",
    "Professional",
    "Programmer",
    "Provider",
    "Practitioner",
    "Producer",
    "Specialist",
    "Scientist",
    "Scripter",
    "Technologist",
    "Virtuoso",
    "Visionary",
    "Wizard",
    "Worker",
];

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const adjective = document.querySelector(".word--adjective");
const technology = document.querySelector(".word--technology");
const noun = document.querySelector(".word--noun");

const savebtn = document.querySelector(".js-save");
const generatebtn = document.querySelector(".js-generate");
const toggleMenuButtons = document.querySelectorAll(".js-toggle-menu");

const savedNamesList = document.querySelector(".js-saved-names");

// a template for the displayed saved name
const savedNameTemplate = `
    <span class="saved-name js-saved-name">
        {$name}
    </span>
    <button class="button-reset saved-names__remove js-remove-saved-name" type="button" title="Remove">
        <svg class="saved-names__remove-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
    </button>
`;

let activeName = null;

const changeSaveButtonState = (state) => {
    if (state === "saved") {
        savebtn.classList.add("saved");
        // set the span with .app__button-label inside savebtn to "saved"
        savebtn.querySelector(".app__button-label").innerHTML = "Saved";

    } else {
        savebtn.classList.remove("saved");
        // savebtn.innerHTML = "Save";
        savebtn.querySelector(".app__button-label").innerHTML = "Save";
    }
};

const saveName = () => {
    // save adjective, technology, noun to local storage as one string in an array
    const name = `${adjective.innerHTML} ${technology.innerHTML} ${noun.innerHTML}`;
    const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
    // check if the name doesn't already exists in savedNames
    if (savedNames.includes(name)) {
        changeSaveButtonState("save");
        removeSavedName(name);
        return;
    } else {
        savedNames.push(name);
        localStorage.setItem("savedNames", JSON.stringify(savedNames));
        activeName = name;
    }

    // add the name to the saved names list with savedNameTemplate
    addNameToSavedNamesList(name);

    // disableButton(savebtn);
    changeSaveButtonState("saved");

    // hide the empty message
    hideSavedNamesEmptyMessage();

    deacitvateSavedNames();
    activateSavedName(activeName);
}

const loadSavedNames = () => {
    // clear html of the saved names list
    savedNamesList.innerHTML = "";

    const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
    savedNames.forEach((name) => {
        addNameToSavedNamesList(name);
    });

    // show the empty message if there are no saved names
    if (savedNames.length === 0) {
        showSavedNamesEmptyMessage();
    }
}

const showSavedNamesEmptyMessage = () => {
    const savedNamesEmptyMessage = document.querySelector(".js-saved-names-empty-message");
    savedNamesEmptyMessage.classList.remove("is-hidden");
}

const hideSavedNamesEmptyMessage = () => {
    const savedNamesEmptyMessage = document.querySelector(".js-saved-names-empty-message");
    savedNamesEmptyMessage.classList.add("is-hidden");
}

const addNameToSavedNamesList = (name) => {
    const li = document.createElement("li");
    li.classList.add("saved-names__item");
    li.innerHTML = savedNameTemplate.replace("{$name}", name);
    // add it first in the list
    savedNamesList.prepend(li);
}

const removeSavedName = (name) => {
    const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
    const index = savedNames.indexOf(name);
    if (index > -1) {
        savedNames.splice(index, 1);
    }
    localStorage.setItem("savedNames", JSON.stringify(savedNames));

    loadSavedNames();

    if (savedNames.length === 0) {
        showSavedNamesEmptyMessage();
    }
}

const saveCurrentName = () => {
    const name = `${adjective.innerHTML} ${technology.innerHTML} ${noun.innerHTML}`;
    localStorage.setItem("currentName", name);
}

const loadSavedCurrentName = () => {
    const name = localStorage.getItem("currentName");
    if (name) {
        const [adjectiveName, technologyName, nounName] = name.split(" ");
        adjective.innerHTML = adjectiveName;
        technology.innerHTML = technologyName;
        noun.innerHTML = nounName;
        activateSavedName(name);

        // check if the nam is in the saved names list
        const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
        if (savedNames.includes(name)) {
            changeSaveButtonState("saved");
        }

    } else {
        setRandomName();
    }
}

const setRandomName = () => {
    if (!adjective.classList.contains("word--pinned")) {
        adjective.innerHTML = adjectives[getRandomNumber(adjectives.length)];
    }

    if (!technology.classList.contains("word--pinned")) {
        technology.innerHTML = technologies[getRandomNumber(technologies.length)];
    }

    if (!noun.classList.contains("word--pinned")) {
        noun.innerHTML = nouns[getRandomNumber(nouns.length)];
    }

    // Check if the name is in the saved names list
    const name = `${adjective.innerHTML} ${technology.innerHTML} ${noun.innerHTML}`;
    const savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];
    if (savedNames.includes(name)) {
        changeSaveButtonState("saved");
        activateSavedName(name);

    } else {
        changeSaveButtonState("save");
        deacitvateSavedNames();
    }

    saveCurrentName();
};

const pinWord = (event) => {
    const word = event.currentTarget;
    word.classList.toggle("word--pinned");

    // if all words are pinned disable the generate button
    if (adjective.classList.contains("word--pinned") && technology.classList.contains("word--pinned") && noun.classList.contains("word--pinned")) {
        disableButton(generatebtn);
    } else {
        enableButton(generatebtn);
    }
};

const unpinAllWords = () => {
    adjective.classList.remove("word--pinned");
    technology.classList.remove("word--pinned");
    noun.classList.remove("word--pinned");
    enableButton(generatebtn);
};

const disableButton = (button) => {
    button.classList.add("app__button--disabled");
    // add disabled attribute to the button
    button.setAttribute("disabled", "disabled");
};

const enableButton = (button) => {
    button.classList.remove("app__button--disabled");
    // remove disabled attribute from the button
    button.removeAttribute("disabled");
};

const showLockIndicator = () => {
    const indicator = document.createElement("div");
    indicator.classList.add("lock-indicator");
    document.body.appendChild(indicator);
    document.addEventListener("mousemove", (event) => {
        indicator.style.setProperty("--x", event.clientX + "px");
        indicator.style.setProperty("--y", event.clientY + "px");
    });
};

const toggleMenu = () => {
    document.querySelector("body").classList.toggle("has-open-menu");

    // check if the menu is open and if it's open close it with escape
    if (document.querySelector("body").classList.contains("has-open-menu")) {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                toggleMenu();
            }
        });
    }
}

// a function to show the saved name when it's clicked
const showSavedName = (event) => {
    const savedName = event.target;
    const name = savedName.innerHTML.trim();
    const [adjectiveName, technologyName, nounName] = name.split(" ");
    adjective.innerHTML = adjectiveName;
    technology.innerHTML = technologyName;
    noun.innerHTML = nounName;
    saveCurrentName();
    unpinAllWords();
}

const deacitvateSavedNames = () => {
    const savedNames = document.querySelectorAll(".js-saved-name");
    savedNames.forEach((savedName) => {
        savedName.parentElement.classList.remove("is-active");
    });
}

const activateClickedName = (event) => {
    deacitvateSavedNames();
    const clickedName = event.target;
    // add a class of is-active
    clickedName.parentElement.classList.add("is-active");
    // disableButton(savebtn);
    changeSaveButtonState("saved");
}

const activateSavedName = (name) => {
    const savedNames = document.querySelectorAll(".js-saved-name");
    savedNames.forEach((savedName) => {
        if (savedName.innerHTML.trim() === name) {
            savedName.parentElement.classList.add("is-active");
        }
    });
}

const handleSavedNamesClick = (event) => {
    if (event.target.classList.contains("js-saved-name")) {
        showSavedName(event);
        activateClickedName(event);
    } else if (event.target.classList.contains("js-remove-saved-name")) {
        const name = event.target.previousElementSibling.innerHTML.trim();
        removeSavedName(name);
        loadSavedCurrentName();

        // check if the name is currently active and if it is change the save button state to save
        const activeName = localStorage.getItem("currentName");
        if (name === activeName) {
            changeSaveButtonState("save");
        }
    }
}


const init = () => {
    loadSavedNames();
    loadSavedCurrentName();

    showLockIndicator();

    generatebtn.addEventListener("click", setRandomName);
    savebtn.addEventListener("click", saveName);

    technology.addEventListener("click", pinWord);
    noun.addEventListener("click", pinWord);
    adjective.addEventListener("click", pinWord);

    // add an event listener to the saved names list to handle the click
    savedNamesList.addEventListener("click", handleSavedNamesClick);

    // add an event listener to the menu buttons to toggle the menu
    toggleMenuButtons.forEach((btn) => {
        btn.addEventListener("click", toggleMenu);
    });

    //listen for the spacebar to generate a new name
    document.addEventListener("keyup", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            setRandomName();
        }
    });
};



init();
