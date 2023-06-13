const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
	secret: 'supersecret',
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));


const password = 'm295';

/*Example tasks created with Chat GPT*/

const tasks = [
	{
		'id': 1,
		'title' : 'Clean',
		'description' : 'Cleaning the house.',
		'done': true,
		'dueDate': '2023-10-10'
	},
	{
		'id': 2,
		'title' : 'Study',
		'description' : 'Preparing for the upcoming exam.',
		'done': false,
		'dueDate': '2023-06-20'
	},
	{
		'id': 3,
		'title' : 'Exercise',
		'description' : 'Going for a run in the morning.',
		'done': false,
		'dueDate': '2023-06-15'
	},
	{
		'id': 4,
		'title' : 'Grocery Shopping',
		'description' : 'Buying essential items from the grocery store.',
		'done': true,
		'dueDate': '2023-06-16'
	},
	{
		'id': 5,
		'title' : 'Write Blog Post',
		'description' : 'Creating a blog post about the latest technology trends.',
		'done': false,
		'dueDate': '2023-06-18'
	},
	{
		'id': 6,
		'title' : 'Call Mom',
		'description' : 'Having a phone conversation with my mom.',
		'done': false,
		'dueDate': '2023-06-14'
	}
];
  

/*All Tasks*/
exports.getTasks = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');
	response.status(200).json(tasks);
};


exports.postTasks = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');

	const newtask = request.body;
	const newId = tasks[tasks.length - 1].id + 1;

	newtask.id = newId;

	if (!isValid(newtask)) return response.sendStatus(422);

	tasks.push(newtask);
	response.status(201).json(newtask);
  

};

/*Individual Tasks*/

exports.getTaskId  = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');

	const id = request.params.id;
	const task = tasks.find(t => t.id == id);
  
	if (!task) return response.sendStatus(404);
  
	response.status(201).json(task);
};

exports.putTaskId  = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');

	const id = request.params.id;
	const taskIndex = tasks.findIndex(t => t.id == id);
	const taskUpdate = request.body;

	if (!taskIndex < 0) return response.sendStatus(404);
	if (!isValid(taskUpdate)) return response.send(422).json('Missing enteries');

	tasks.splice(taskIndex, 1, taskUpdate);
	response.status(200).json(taskUpdate);
};

exports.deleteTaskId = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');

	const id = request.params.id;
	const taskIndex = tasks.findIndex(t => t.id == id);

	if (!taskIndex < 0) return response.sendStatus(404);

	const searchTask = tasks.find(t => t.id == id);
	const jsonResult = JSON.stringify(searchTask);

	tasks.splice(taskIndex, 1);
	response.status(204).json(jsonResult);

};

/*Session functions*/
exports.getSession  = (request, response)  =>{

	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');
    return response.status(200).json("Verified");
};

exports.postSession  = (request, response)  =>{
	const enteredMail = request.body.enteredMail;
	const enteredPassword = request.body.enteredPassword;

	if (enteredPassword != password) return response.status(401).json('Unauthorized');

	request.session.sessionMail = enteredMail;
	request.session.authorized = true;

	return response.status(201).json(enteredMail);
};

exports.deleteSession  = (request, response)  =>{
	if (!request.session.authorized || !request.session.sessionMail) return response.status(401).json('Unauthorized');
    
	delete request.session.sessionMail;
	request.session.authorized = false;

	return response.sendStatus(204);

};

//Inspired from isValid() shown in the example solutions.
function isValid(task) {
	return task.id != undefined && task.id != '' &&
    task.title != undefined && task.title != '' &&
    task.description != undefined && task.description != ''&&
    task.done != undefined && task.done != '' &&
    task.dueDate!= undefined && task.dueDate != '';
}
