// создаем массив задач
// состоит из объктов вида
// task = {statusTask: false, textTask: ""}
var arrayTasks = new Array();
// логическая перемення отображает свернуты/развернуты задачи
var areShowTasks = true;
// что мы отображаем
// по умолчанию "all", так же возможно: "active", "completed"
var whatShow = "all";

// назначаем функций обработчика событий
window.onload = function()
{
	// нажатие на кнопку Enter - добаление новой записи
	document.getElementById("inputFormNewTask").addEventListener("keypress", AddNewTaskToArray);
	// клик на кнопку удаление всех заверншенных задач
	document.getElementById("clearCompleted").addEventListener("click", ClearCompleted);
	// клик на чекбокс свернуть/развернуть список
	document.getElementById("checkboxExpandTurnTasks").addEventListener("click", ExpandturnTasks);
	
	// клик по фильтру
	document.getElementById("showAll").addEventListener("click", ShowAll);
	document.getElementById("showActive").addEventListener("click", ShowActive);
	document.getElementById("showComleted").addEventListener("click", ShowCompleted);
}

// отображение всех задач
function ShowAll()
{
	var element;
	for (i = 0; i < arrayTasks.length; ++i)
	{
		element = document.getElementById(i.toString());
		element.style.display = "block";
	}
}

// отображаение активных(незавершенных) задач
function ShowActive()
{
	var element;
	for (i = 0; i < arrayTasks.length; ++i)
	{
		element = document.getElementById(i.toString());
		// если задача незавершена
		if (!arrayTasks[i].statusTask)
		{
			// отображаем ее
			element.style.display = "block";
		}
		else
		{
			// если задача завершана
			element.style.display = "none";
		}
	}
}

// отображение завершенных задач
function ShowCompleted()
{
	var element;
	for (i = 0; i < arrayTasks.length; ++i)
	{
		element = document.getElementById(i.toString());
		// если задача завершена
		if (arrayTasks[i].statusTask)
		{
			// отображаем ее
			element.style.display = "block";
		}
		else
		{
			// если задача завершана
			element.style.display = "none";
		}
	}
}

// добавляем новую задачу в массив задач
function AddNewTaskToArray()
{
	var e = e || window.event;
	// добавляем по событию нажатия кнопки "Enter"
	if (e.keyCode === 13)
	{
		// проверяем входящу строку
		var str = document.getElementById("inputFormNewTask").value;
		if (str !== "")
		{
			// создаем объект и добаляем его в массив
			arrayTasks[arrayTasks.length] = {statusTask: 0, textTask: str};
			// обновляем входищий "input"
			document.getElementById("inputFormNewTask").value = "";
			// создаем и добавляем эелемент на форму
			ModelingPasteStrLiElement(arrayTasks.length - 1);
			// обновляем запись о количестве оставшихся задач
			UpdateNumberUnfinishedTasks();
		}
	}
}

// формируем строку которая будет содеражть все внутренные элементы <li>
// принимает порядковый номер задачи в массиве для id
function ModelingPasteStrLiElement(num)
{
	var newList = document.createElement("li");
	newList.className = "task";
	newList.id = num;
	listElement.appendChild(newList);
	
	document.getElementById(num).innerHTML = ModelingStrCheckboxDone(num) + ModelingStrDivText(num) + ModelingStrButtonDeleteDivSpan(num);
}

// формируем html-теги для checkbox-а
function ModelingStrCheckboxDone(num)
{
	var str = "<input class=\"checkboxDone\"" + "id=" + num + ".0 " + "type=\"checkbox\"\>";
	return str;
}

// формируем html-теги для div-а с текстом записи
function ModelingStrDivText(num)
{
	var str = "<div class=\"text\" " + "id=" + num + ".1>" + arrayTasks[num].textTask + "</div>";
	return str;
}

// формируем html-теги для div-а с кнопкой удаления записи
function ModelingStrButtonDeleteDivSpan(num)
{
	var str = "<div class=\"buttonDelete\" " + "id=" + num + ".2 " + "onselectstart=\"return false\" onmousedown=\"return false\"><span class=\"buttonDeleteTask\"" + "id=" + num + ".2.0"  + ">X</span></div>";
	return str;
}

// все события клика
document.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
	
	// клик на кнопку удаления записи
	if (target.className === "buttonDeleteTask")
	{
		// id элемента который удаляем
		var id = target.id.replace(/.2.0/, "");
		var idInt = parseInt(id);
		// удаляем элемент из списка ul
		DeleteTaskFromUl(id);
		// удаляем элемент из массива записей
		DeleteTaskFromArray(idInt);
		// обновляем id в списке ul
		UpdateDataListId(idInt);
		// обновляем запись о количестве оставшихся задач
		UpdateNumberUnfinishedTasks();
	}
	// клик на checkbox - статус задачи
	if (target.className === "checkboxDone")
	{
		// id элемента которому меняем статус
		var id = target.id.replace(/.0/, "");
		var idInt = parseInt(id);
		// меняем статус
		arrayTasks[idInt].statusTask ^= true;
		// обновляем запись о количестве оставшихся задач
		UpdateNumberUnfinishedTasks();
	}
}

// сворачивание/разворачивание задач
function ExpandturnTasks()
{
	if (arrayTasks.length > 0)
	{
		if (areShowTasks)
		{
			document.getElementById("listElement").style.display = "none";
	//		var elements = document.getElementsByClassName("task");
	//		for (i = 0; i < elements.length; ++i)
	//		{
	//			elements[i].style.display = "none";
	//		}
				areShowTasks ^= true;
		}
		else
		{
			document.getElementById("listElement").style.display = "block";
	//		var elements = document.getElementsByClassName("task");
	//		for (i = 0; i < elements.length; ++i)
	//		{
	//			elements[i].style.display = "block";
	//		}
			areShowTasks ^= true;
		}
	}
}

// удаление записи
// удаление всех элементов внутри тега <li> включая его самого с заданым id
function DeleteTaskFromUl(id)
{
	var element = document.getElementById(id);
	element.remove();
}

// удаляем запись из массива
function DeleteTaskFromArray(index)
{
	// проходим от элемента который надо удалить до конца списка переприсваивая объекты
	for (var i = index; i < arrayTasks.length - 1; ++i)
	{
		arrayTasks[i].statusTask = arrayTasks[i + 1].statusTask;
		arrayTasks[i].textTask = arrayTasks[i + 1].textTask;
	}
	// удаляем последний элемент
	arrayTasks.splice(arrayTasks.length - 1, 1);
}

// обновление списка всех задач на экране
function UpdateDataListId(id)
{
	for (var i = id + 1; i < arrayTasks.length + 1; ++i)
	{
		// обновляем id элемента li
		document.getElementById(i.toString()).id = (i - 1).toString();
		// обновляем id элемента checkbox(статус задачи)
		document.getElementById(i.toString() + ".0").id = (i - 1).toString() + ".0";
		// обновляем id элемента div(текст задачи)
		document.getElementById(i.toString() + ".1").id = (i - 1).toString() + ".1";
		// обновляем id элемента div(кнопка удаления)
		document.getElementById(i.toString() + ".2").id = (i - 1).toString() + ".2";
		// обновляем id элемента span(кнопка удаления)
		document.getElementById(i.toString() + ".2.0").id = (i - 1).toString() + ".2.0";
	}
}

// обновление записи о количестве оставшихся задач
function UpdateNumberUnfinishedTasks()
{
	var number = 0;
	// подсчитываем оставшиеся задачи
	for (var i = 0; i < arrayTasks.length; ++i)
	{
		if (!arrayTasks[i].statusTask)
			++number;
	}
	// отображаем их пользователю
	if (number > 1)
		document.getElementById("unfinishedTasks").innerHTML = number + " toDos left";
	else
		document.getElementById("unfinishedTasks").innerHTML = number + " toDo left";
}

// удаление завершенных задач
function ClearCompleted()
{
	for (var i = 0; i < arrayTasks.length; ++i)
	{
		// проверяем статус задачи
		if (arrayTasks[i].statusTask)
		{
			// удаляем элемент из списка ul
			DeleteTaskFromUl(i.toString());
			// удаляем элемент из массива записей
			DeleteTaskFromArray(i);
			// обновляем id в списке ul
			UpdateDataListId(i);
			--i;
		}
	}
}