// создаем массив записей
// ссотоит из объктов вида
// record = {statusRecord: false, textRecord: ""}
var arrayRecord = new Array();

//назначаем функций обработчика событий
window.onload = function()
{
	document.getElementById("inputFormNewRecord").addEventListener("keypress", AddNewRecordToArray);
//	document.getElementById("checkboxExpandTurnRecords").addEventListener("click", ExpandTurnRecords);
}

// добавляем новое значение в массив записей
function AddNewRecordToArray()
{
	var e = e || window.event;
	// добавляем по событию нажатия кнопки "Enter"
	if (e.keyCode === 13)
	{
		// проверяем входящу строку
		var str = document.getElementById("inputFormNewRecord").value;
		if (str !== "")
		{
			// создаем объект и добаляем его в массив
			arrayRecord[arrayRecord.length] = {statusRecord: 0, textRecord: str};
			// обновляем входищий "input"
			document.getElementById("inputFormNewRecord").value = "";
			// создаем и добавляем эелемент на форму
			ModelingPasteStrLiElement(arrayRecord.length - 1);
		}
	}
}

// формируем строку которая будет содеражть все внутренные элементы <li>
// принимает порядковый номер записи в массиве для id
function ModelingPasteStrLiElement(num)
{
	var newList = document.createElement("li");
	newList.className = "record";
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
	var str = "<div class=\"text\" " + "id=" + num + ".1>" + arrayRecord[num].textRecord + "</div>";
	return str;
}

// формируем html-теги для div-а с кнопкой удаления записи
function ModelingStrButtonDeleteDivSpan(num)
{
	var str = "<div class=\"buttonDelete\" " + "id=" + num + ".2 " + "onselectstart=\"return false\" onmousedown=\"return false\"><span class=\"buttonDeleteRecord\"" + "id=" + num + ".2.0"  + ">X</span></div>";
	return str;
}

// все события клика
document.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
	
	// клик на кнопку удаления записи
	if (target.className === "buttonDeleteRecord")
	{
		// id элемента который удаляем
		var id = target.id.replace(/.2.0/, "");
		var idInt = parseInt(id);
		// удаляем элемент из списка ul
		DeleteRecordFromUl(id);
		// удаляем элемент из массива записей
		DeleteRecordFromArray(idInt);
		// обновляем id в списке ul
		UpdateDataListId(idInt);
	}
	// клик на checkbox - статус задания
	if (target.className === "checkboxDone")
	{
		// id элемента которому меняем статус
		var id = target.id.replace(/.0/, "");
		var idInt = parseInt(id);
		
		console.log(arrayRecord[idInt].statusRecord);
		arrayRecord[idInt].statusRecord ^= true;
		console.log(arrayRecord[idInt].statusRecord);
	}
	
//	console.log(arrayRecord);
}

// удаление записи
// удаление всех элементов внутри тега <li> включая его самого с id===num
function DeleteRecordFromUl(id)
{
	var element = document.getElementById(id);
	element.remove();
}

// удаляем запись из массива
function DeleteRecordFromArray(index)
{
	// проходим от элемента который надо удалить до конца списка переприсваивая объекты
	for (var i = index; i < arrayRecord.length - 1; i++)
	{
		arrayRecord[i].statusRecord = arrayRecord[i + 1].statusRecord;
		arrayRecord[i].textRecord = arrayRecord[i + 1].textRecord;
	}
	// удаляем последний элемент
	arrayRecord.splice(arrayRecord.length - 1, 1);
}

// обновление списка всех записей на экране
function UpdateDataListId(id)
{
	for (var i = id + 1; i < arrayRecord.length + 1; ++i)
	{
		// обновляем id элемента li
		document.getElementById(i.toString()).id = (i - 1).toString();
		// обновляем id элемента checkbox(статус задания)
		document.getElementById(i.toString() + ".0").id = (i - 1).toString() + ".0";
		// обновляем id элемента div(текст задания)
		document.getElementById(i.toString() + ".1").id = (i - 1).toString() + ".1";
		// обновляем id элемента div(кнопка удаления)
		document.getElementById(i.toString() + ".2").id = (i - 1).toString() + ".2";
		// обновляем id элемента span(кнопка удаления)
		document.getElementById(i.toString() + ".2.0").id = (i - 1).toString() + ".2.0";
	}
}