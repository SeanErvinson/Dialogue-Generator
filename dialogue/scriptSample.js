document.addEventListener("DOMContentLoaded", function () {
    // Reference to the Add New Interactable Button
    var addInteractable = document.getElementById("add-interactable");
    // Reference to the Div
    var interactables = document.getElementById("interactables");
    // Number of Interactables
    var i = 0;
    
    // Json Object
    var interactable = {
        "interactable": []
    };

    // Add button click event
    addInteractable.addEventListener('click', function () {
        addNewGroup();
    });

    // Main Dialogue Group; The whole template form 
    function addNewGroup() {
        var container = document.createElement("div");
        var informationGroup = basicForm();
        var messageGroup = messageForm("Message", "NormalGroup", "RepeatGroup");
        var linebreak = document.createElement("hr");
        linebreak.style.backgroundColor = "black";

        informationGroup.className = "informationGroup";
        interactable.interactable.push({
            "id": i,
            "type": "",
            "name": "",
            "message": {
                ["normal"]: [""]
            }
        });
        messageGroup.className = "col";
        container.className = "container";
        container.appendChild(informationGroup);
        container.appendChild(messageGroup);
        container.appendChild(linebreak);
        interactables.appendChild(container);
        i++;

        function basicForm() {
            var masterFormGroup = document.createElement("form");
            var topFormGroup = document.createElement("form");
            var botFormGroup = document.createElement("form");
            var idGroup = addId("objectId", "ID", "objectClass");
            var nameGroup = addInputField("nameId", "Name", "nameClass");
            var type = addTypeDropDown("typeId", "Type", "typeClass");
            var removeInteractable = document.createElement('button');
            removeInteractable.className = "col-sm-2 btn btn-danger";
            removeInteractable.textContent = "Remove Interactable";
            removeInteractable.addEventListener('click', function (event) {
                event.preventDefault();
                i--;
                var element = this.parentElement.parentElement.parentElement;
                interactables.removeChild(element);
                updateId();
                interactable.interactable.pop();
            });
            
            nameGroup.className = "col-sm-0";
            type.className = "col";
            idGroup.className = "col-sm-2";
            topFormGroup.className = "row";
            botFormGroup.className = "row";
            masterFormGroup.className = "basicForm";

                    
            function updateId() { 
                interactables.querySelectorAll(".informationGroup").forEach(function (container, index) {
                    container.querySelector(".objectClass").value = index;
                });
            }

            topFormGroup.appendChild(idGroup);
            topFormGroup.appendChild(removeInteractable);
            botFormGroup.appendChild(nameGroup);
            botFormGroup.appendChild(type);
            masterFormGroup.appendChild(topFormGroup);
            masterFormGroup.appendChild(botFormGroup);
            return masterFormGroup;

            function addId(id, label, className) {
                var formGroup = document.createElement("div");
                var idLabel = document.createElement("label");
                var idInput = document.createElement("input");
        
                formGroup.className = className + " row";

                idInput.readOnly = true;
                idInput.value = i;
                idInput.id = id + i;
                idInput.className = "objectClass col-sm-4";
                idInput.style.textAlign = "right";
                
                idLabel.textContent = label;
                idLabel.className = "col-sm-2";
                
                formGroup.appendChild(idLabel);
                formGroup.appendChild(idInput);
                return formGroup;
            }
        }      
    }
    
    function messageForm(label, normId, repId) {
        var normalId = 0;
        var repeatId = 0;
        var choiceId = 0;
        // Container
        var formGroup = document.createElement("div");
        var messageContainer = document.createElement("div");
        // Header
        var messageHeader = addHeader(label, "h2");
        // Normal
        var normalDialogueGroup = genericDialogueForm("normalDialogueGroup", "Normal", "normalFormName", "normalMsg", "normalButtonGroup", "normalMsgClass");
        // Repeat Toggle
        var toggleRepeat = addToggle("toggleRepeat", "Has Repeat", "toggleRepeatClass");
        // Repeat
        var repeatDialogueGroup = genericDialogueForm("repeatDialogueGroup", "Repeat", "repeatFormName", "repeatMsg", "repeatdButtonGroup", "repeatMsgClass");
        // Choice Toggle
        var toggleChoice = addToggle("toggleChoice", "Has Choice", "toggleChoiceClass");
        // Choice
        var choiceDialogueGroup = choiceDialogueGroup();
        
        messageContainer.className = "row";
        messageContainer.appendChild(normalDialogueGroup);
        messageContainer.appendChild(repeatDialogueGroup);
        // Toggles Choice
        var toggleChoiceValue = toggleChoice.querySelector("#toggleChoice" + i);
        // Click event for toggle choice
        toggleChoiceValue.addEventListener("click", function () {
            interactable.interactable[0]["choice"] = [{ "dialog": "", "linkID": 0 }, { "dialog": "", "linkID": 1 }];
            interactable.interactable[0]["linkIdMessage"] = [{ "content": "" }, { "content": "" }];
            choiceDialogueGroup.style.display = toggleChoiceValue.checked ? "block" : "none";
            choiceDialogueGroup.querySelectorAll(".choiceInputClass").forEach(function (item, index) {
                item.value = "";
            });
            choiceDialogueGroup.querySelectorAll(".choiceDialogueOneClass").forEach(function (item, index) {
                item.value = "";
            });
            choiceDialogueGroup.querySelectorAll(".choiceDialogueTwoClass").forEach(function (item, index) {
                item.value = "";
            });
        })
        
        repeatDialogueGroup.style.display = "none";
        formGroup.className = "messageForm";
        normalDialogueGroup.className = "normalDialogueGroup";
        normalDialogueGroup.id = normId + i;
        repeatDialogueGroup.className = "repeatDialogueGroup";
        repeatDialogueGroup.id = repId + i;
    

        var toggleRepeatValue = toggleRepeat.querySelector("#toggleRepeat" + i);
        toggleRepeatValue.addEventListener('click', function () {
            interactable.interactable[0]["message"] = { ["normal"]: [""], ["repeat"]: [""] };
            repeatDialogueGroup.style.display = toggleRepeatValue.checked ? "block" : "none"; 
            repeatDialogueGroup.querySelectorAll(".repeatFormName").forEach(function (item, index) {
                item.querySelector("#repeatMsg" + index).value = "";
            });
        });

        function choiceDialogueGroup() { 
            var formGroup = document.createElement("div");
            var choiceHeader = addHeader("Choice", "h2");
            var choiceDialogueForm = choiceDialogueInput("choiceOneInputId", "Choice" + (choiceId + 1), "choiceOneInputClass", "choiceDialogue" + choiceId, "Choice" + (choiceId + 1), "choiceDialogueName", "choiceDialogue", "choiceDialogueButton", "choiceDialogueOneClass");
            formGroup.className = "choiceDialogueFormClass";
            var choiceDialogueForm2 = choiceDialogueInput("choiceTwoInputId", "Choice" + (choiceId + 1), "choiceTwoInputClass", "choiceDialogue"+choiceId, "Choice" + (choiceId + 1), "choiceDialogueName", "choiceDialogue", "choiceDialogueButton", "choiceDialogueTwoClass");
            function choiceDialogueInput(id, label, className, dialogueId, dialogueIdSubHeaderLabel, dialogueFormName, dialogueId, buttonGroupId, dialogueIdClassName) {
                
                var innerFormGroup = document.createElement("div");
                var choiceInputField = addInputField(id, label, className);
                var choiceDialogue = genericDialogueForm(dialogueId, dialogueIdSubHeaderLabel, dialogueFormName, dialogueId, buttonGroupId, dialogueIdClassName);

                innerFormGroup.className = "choiceDialogueInputClass";
                innerFormGroup.appendChild(choiceInputField);
                innerFormGroup.appendChild(choiceDialogue);
                choiceId++;
                return innerFormGroup;
            }
            formGroup.style.display = "none";
            formGroup.appendChild(choiceHeader);
            formGroup.appendChild(choiceDialogueForm);
            formGroup.appendChild(choiceDialogueForm2);
            
            return formGroup;
        }
        
        // Generic Dialogue Form
        // This contains
        // Header
        // Dialogue Box
        // Button (Add and Remove)
        function genericDialogueForm(id, subHeaderLabel, dialogueFormName, dialogueId, buttonGroupId, className) {
            var genericFormGroup = document.createElement('div');
            var genericHeader = addHeader(subHeaderLabel, "h5");
            var genericDialogue = dialogueForm(dialogueFormName, dialogueId, className);
            var genericdButtonGroup = buttonForm(buttonGroupId, dialogueFormName, dialogueId, className);
            genericFormGroup.id = id + i;
            if (id == "normalDialogueGroup")
            {
                genericFormGroup.id = id + normalId;
            }   
            else if (id == "repeatDialogueGroup")
            {
                genericFormGroup.id = id + repeatId;
            }    
            else (id == "choiceDialogueGroup")
            {
                genericFormGroup.id = id + choiceId;
            }    

            function buttonForm(id, formId, dialogueId, className) {
                var formGroup = document.createElement("div");
                var addButton = document.createElement("button");
                var removeButton = document.createElement("button");
                var cloneDialogue;
                formGroup.id = id + i;
                addButton.textContent = "Add";
                addButton.className = "btn-success";
                addButton.addEventListener("click", function () {
                    if (id == "repeatdButtonGroup") {
                        repeatId++;
                    }
                    else if (id == "normalButtonGroup") {
                        normalId++;
                    }
                    else {
                        choiceId++;
                    }
                    cloneDialogue = dialogueForm(formId, dialogueId, className);
                    genericFormGroup.appendChild(cloneDialogue);
                });
                removeButton.textContent = "Remove";
                removeButton.className = "btn-danger";
                removeButton.addEventListener("click", function () {
                    if (repeatId != 0 || normalId != 0) { 
                        if (id == "repeatdButtonGroup") {
                            var element = genericFormGroup.querySelector('#repeatFormName' + repeatId);
                            repeatId--;
                            genericFormGroup.removeChild(element);
                        }
                        else if (id == "normalButtonGroup") {
                            var element = genericFormGroup.querySelector('#normalFormName' + normalId);
                            normalId--;
                            genericFormGroup.removeChild(element);
                        }
                    }    
                    // Remove Choice needs a bit more work
                    if (choiceId != 0) {
                        if (id == "choiceDialogueButton")
                        {    
                            var element = genericFormGroup.querySelector('#choiceDialogueName' + choiceId);
                            choiceId--;
                            genericFormGroup.removeChild(element);
                        }
                    }    
                })
                addButton.style.display = "inline";
                removeButton.style.display = "inline";
    
                formGroup.appendChild(addButton);
                formGroup.appendChild(removeButton);
                return formGroup;
            }

            function dialogueForm(formId, id, className) {
                var formGroup = document.createElement("div");
                var messageInput = document.createElement("textarea");
                messageInput.rows = 3;
                messageInput.cols = 40;
                messageInput.className = className;
                if (formId == "normalFormName")
                {
                    messageInput.id = id + normalId;
                    formGroup.id = formId + normalId;
                }    
                else if (formId == "repeatFormName")
                {
                    messageInput.id = id + repeatId;
                    formGroup.id = formId + repeatId;
                }   
                else
                {
                    messageInput.id = id + choiceId;
                    formGroup.id = formId + choiceId;
                }   
                formGroup.className = formId;
                
                formGroup.appendChild(messageInput);
                
                return formGroup;
            }

            genericFormGroup.appendChild(genericHeader);
            genericFormGroup.appendChild(genericDialogue);
            genericFormGroup.appendChild(genericdButtonGroup);
            return genericFormGroup;            
        }

       
        formGroup.appendChild(messageHeader);
        formGroup.appendChild(messageContainer);
        formGroup.appendChild(toggleRepeat);
        formGroup.appendChild(toggleChoice);
        formGroup.appendChild(choiceDialogueGroup);
        
        return formGroup;
    }

    // Add input field - Single line input (ie. Name)
    // <param name="id">id of the input field</param>
    // <param name="label">Text of the input field</param>input field
    // <param name="className">className of the input field</param>
    function addInputField(id, label, className) {
        var formGroup = document.createElement("div");
        var nameLabel = document.createElement("label");
        var nameInput = document.createElement("input");

        nameInput.id = id + i;
        nameLabel.textContent = label;
        nameLabel.setAttribute("for", id + i);

        nameInput.className = className;
        formGroup.className = "row mb-0";
        nameLabel.className = "col-sm-0";

        formGroup.appendChild(nameLabel);
        formGroup.appendChild(nameInput);
        return formGroup;
    }

    // Add Drop down option
    // <param name="id">id of the drop down</param>
    // <param name="label">Text of the drop down</param>
    // <param name="className">className of the drop down</param>
    function addTypeDropDown(id, label, className) {
        var formGroup = document.createElement("div");
        var typeLabel = document.createElement("label");
        var typeInput = document.createElement("select");
        var OptionOne = document.createElement("option");
        var OptionTwo = document.createElement("option");

        OptionOne.text = "NPC";
        OptionTwo.text = "Object";
        typeInput.add(OptionOne);
        typeInput.add(OptionTwo);
        typeInput.className = className;
        typeInput.id = id + i;
        typeLabel.textContent = label;
        typeLabel.className = "col-sm-2"
        formGroup.className = "row mb-0";

        formGroup.appendChild(typeLabel);
        formGroup.appendChild(typeInput);
        return formGroup;
    }

    // Add toggle button (ie. checkbox)
    // <param name="id">id of the toggleButton</param>
    // <param name="label">Text of the toggleButton</param>
    // <param name="className">className of the toggleButton</param>
    function addToggle(id, label, className) {
        var formGroup = document.createElement("div");
        var toggleLabel = document.createElement("label");
        var toggleButton = document.createElement("input");
        toggleButton.setAttribute("type", "checkbox");
        toggleButton.id = id + i;
        toggleButton.className = className;

        toggleLabel.textContent = label;
        formGroup.appendChild(toggleLabel);
        formGroup.appendChild(toggleButton);
        return formGroup;
    }

    // Add the header
    // <param name="label">Text of the Header</param>  
    // <param name="size">size of the Header</param>  
    function addHeader(label, size) {
        var heading = document.createElement(size);
        heading.textContent = label;
        return heading;
    }

    // Reference to the Generate Button
    var generateJSONButton = document.getElementById("generate-json");
    var generatedJson = document.getElementById("generated-json-text");
    // Click event for generating the JSON
    generateJSONButton.addEventListener('click', function () {
        // Gets a reference of all the Template Form
        interactables.querySelectorAll('.container').forEach(function (container, index) {
        // From the Template Form X
            // For the idValue, nameValue, typeValue the class or id will do since it is unique per Template Form    

            // Get the Id value
            var idValue = container.querySelector(".objectClass").value;
            // Get the Name Value
            var nameValue = container.querySelector(".nameClass").value;
            // Get the Type Value
            var typeValue = container.querySelector(".typeClass").value;

            // For the rest, class is important since id doesn't carry the value itself
            
            // Initialize some array for the messages
            var normalMsg = new Array();
            var repeatMsg = new Array();
            var choiceOneMsg = new Array();
            var choiceTwoMsg = new Array();

            // Loops through class: .normalFormName 
            // item then loops through the .normalMsgClass which is the (user)input
            // and stores them to the normalMsg
            container.querySelectorAll(".normalFormName").forEach(function (item, count) {
                normalMsg[count] = item.querySelector(".normalMsgClass").value;
            });

            // Loops through class: .repeatFormName 
            // item then loops through the .repeatMsgClass which is the (user)input
            // and stores them to the repeatMsg
            container.querySelectorAll(".repeatFormName").forEach(function (item, count) {
                repeatMsg[count] = item.querySelector(".repeatMsgClass").value;
            });

            // Loops through class: .choiceDialogueOneClass 
            // Since the class is unique (soon to be change)
            // choiceOneMsg is fine storing directly from it
            container.querySelectorAll(".choiceDialogueOneClass").forEach(function (item, count) {
                choiceOneMsg[count] = item.value;
            });
            // Both choiceOneValue and choiceTwoValue are similar with the first three
            var choiceOneValue = container.querySelector(".choiceOneInputClass").value;
            var choiceTwoValue = container.querySelector(".choiceTwoInputClass").value;

            // Loops through class: .choiceDialogueTwoClass 
            // Since the class is unique (soon to be change)
            // choiceTwoMsg is fine storing directly from it
            container.querySelectorAll(".choiceDialogueTwoClass").forEach(function (item, count) {
                choiceTwoMsg[count] = item.value;
            });

            // Assign the values to the (JSON)Object
            interactable.interactable[index]["id"] = idValue;
            interactable.interactable[index]["name"] = nameValue;
            interactable.interactable[index]["type"] = typeValue;

            // Create messageObject in order to make it more readable
            var messageObject = interactable.interactable[index]["message"] = {};
            messageObject["normal"] = normalMsg;

            // Checks whether hasChoice or hasRepeat has been click
            // and if it is then assign the value to it
            var checkToggle = container.querySelector(".toggleRepeatClass");
            if (checkToggle.checked) { 
                messageObject["repeat"] = repeatMsg;
            }    
            
            checkToggle = container.querySelector(".toggleChoiceClass");
            // F:NI:2 linkID needs to be more dynamic
            // What I can do is make another input and let the user decide where it links with
            if (checkToggle.checked) { 
                interactable.interactable[index]["choice"] = [
                { "dialog": choiceOneValue, "linkID": 0 },
                { "dialog": choiceTwoValue, "linkID": 1 }];
                interactable.interactable[index]["linkIdMessage"] = [
                    { "content": choiceOneMsg },
                    { "content": choiceTwoMsg }];
            }    
        });
        generateJson();
    });

    // Generate the JSON to the text Area
    function generateJson() {
        var stringified = JSON.stringify(interactable);
        generatedJson.textContent = stringified;
    }
});

