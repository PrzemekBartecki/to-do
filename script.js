document.addEventListener("DOMContentLoaded", function () {

	const btnAdd = document.querySelector('.btn.add');
	const btnDel = document.querySelector('.btn.delete');
	const btnCl = document.querySelector('.btn.clear');
	let counter = 1;
	const ul = document.querySelector('ul');
	let task = document.querySelector('input');
	/*test*/
	const arrayTasks = localStorage.getItem('taskList') ?
		JSON.parse(localStorage.getItem('taskList')) : [];

	localStorage.setItem('taskList', JSON.stringify(arrayTasks))
	let arrayTasks2 = JSON.parse(localStorage.getItem('taskList'))

	let liMaker = function (text) {
		var li = document.createElement('li');
		li.textContent = text + ' -#' + counter++;;
		ul.appendChild(li);
	};
	/*test 2 spradzajc PR*/
	/*
	 * Dodajemy element
	 */
	btnAdd.addEventListener('click', function () {
		if (task.value.trim() === '') {
			let emptyTxt = task.value.replace(/\s/g, '')
			task.value = emptyTxt;
			task.placeholder = 'write a task';
			return
		} else {
			task.placeholder = 'to do ...';
		}
		let taskValue = task.value

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
		let lastTask = document.querySelector('ul li:last-child')
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
		let taskList = document.querySelectorAll('ul li')

		for (let i = 0; i < taskList.length; i++) {
			taskList[i].parentNode.removeChild(taskList[i]);
		}

		counter = 1;
		arrayTasks = [];
	});

});