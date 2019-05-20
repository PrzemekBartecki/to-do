document.addEventListener("DOMContentLoaded", function () {

	var btnAdd = document.querySelector('.btn.add');
	var btnDel = document.querySelector('.btn.delete');
	var btnCl = document.querySelector('.btn.clear');
	var counter = 1;
	var ul = document.querySelector('ul');
	var task = document.querySelector('input');

	var arrayTasks = localStorage.getItem('taskList') ?
		JSON.parse(localStorage.getItem('taskList')) : [];

	localStorage.setItem('taskList', JSON.stringify(arrayTasks))
	var arrayTasks2 = JSON.parse(localStorage.getItem('taskList'))

	var liMaker = function (text) {
		var li = document.createElement('li');
		li.textContent = text + ' -#' + counter++;;
		ul.appendChild(li);
	};

	/*
	 * Dodajemy element
	 */
	btnAdd.addEventListener('click', function () {
		if (task.value.trim() === '') {
			var emptyTxt = task.value.replace(/\s/g, '')
			task.value = emptyTxt;
			task.placeholder = 'write a task';
			return
		} else {
			task.placeholder = 'to do ...';
		}
		var taskValue = task.value

		arrayTasks.push(taskValue);
		localStorage.setItem('taskList', JSON.stringify(arrayTasks));
		liMaker(taskValue);
		task.value = '';
	});

	arrayTasks2.forEach(function (e) {
		liMaker(e)
	});

	/*
	 * Usuwamy ostatni element
	 */
	btnDel.addEventListener('click', function () {
		var lastTask = document.querySelector('ul li:last-child')
		if (lastTask) {
			lastTask.parentElement.removeChild(lastTask);
			counter--
		}

		arrayTasks.pop();
		localStorage.setItem('taskList', JSON.stringify(arrayTasks));
	});

	/*
	 * Usuwamy całą listę
	 */
	btnCl.addEventListener('click', function () {
		localStorage.clear();
		var taskList = document.querySelectorAll('ul li')

		for (let i = 0; i < taskList.length; i++) {
			taskList[i].parentNode.removeChild(taskList[i]);
		}

		counter = 1;
		arrayTasks = [];
	});

});