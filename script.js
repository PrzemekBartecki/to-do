document.addEventListener("DOMContentLoaded", function () {
	setTimeout(() => {
		let liAppear = document.querySelectorAll('.appear');
		for (let i = 0; i < liAppear.length; i++) {
			liAppear[i].classList.remove('appear');
			console.log('usuwanie');
		}
	}, 1);


	const btnAdd = document.querySelector('.btn.add');
	const btnDel = document.querySelector('.btn.delete');
	const btnCl = document.querySelector('.btn.clear');
	let counter = 1;
	const ul = document.querySelector('ul');
	let task = document.querySelector('input');

	const arrayTasks = localStorage.getItem('taskList') ?
		JSON.parse(localStorage.getItem('taskList')) : [];

	localStorage.setItem('taskList', JSON.stringify(arrayTasks))
	let arrayTasks2 = JSON.parse(localStorage.getItem('taskList'))

	let liMaker = (text) => {
		var li = document.createElement('li');
		li.textContent = text + ' -#' + counter++;
		li.classList.add('appear')
		ul.appendChild(li);
	};

	/*
	 * Dodajemy element
	 */
	btnAdd.addEventListener('click', () => {
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

	arrayTasks2.forEach((e) => {
		liMaker(e)
	});

	/*
	 * Usuwamy ostatni element
	 */
	btnDel.addEventListener('click', () => {
		let lastTask = document.querySelector('ul li:last-child');
		lastTask.classList.add('removeLi');
		if (lastTask) {
			setTimeout(() => {
				lastTask.parentElement.removeChild(lastTask);
			}, 1900);
			counter--
		}

		arrayTasks.pop();
		localStorage.setItem('taskList', JSON.stringify(arrayTasks));
	});

	/*
	 * Usuwamy całą listę
	 */
	btnCl.addEventListener('click', () => {
		localStorage.clear();
		let taskList = document.querySelectorAll('ul li')

		for (let i = 0; i < taskList.length; i++) {
			if (i % 2 == 0) {
				taskList[i].classList.add('leftDirection')
			} else {
				taskList[i].classList.add('rightDirection')
			}
			setTimeout(() => {
				taskList[i].parentNode.removeChild(taskList[i]);
			}, 4000);
		}

		counter = 1;
		arrayTasks = [];
	});

});