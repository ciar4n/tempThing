# Alert

In order to use the alert custom element you need to import the element in the document's head:
```html
<link rel="import" href="joomla-alert.html">
```

The simplified version of the custom elements
```html
<joomla-alert level="info" button="true">
	<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</joomla-alert>
<joomla-alert level="success" button="true">
	<strong>Well done!</strong> You successfully read this important alert message.
</joomla-alert>
<joomla-alert level="warning">
	<strong>Warning!</strong> Better check yourself, you're not looking too good.
</joomla-alert>
<joomla-alert level="danger" button="true">
	<strong>Oh snap!</strong> Change a few things up and try submitting again.
</joomla-alert>
```

### Alerts demo:
<joomla-alert level="info" button="true">
    <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
</joomla-alert>
<joomla-alert level="success" button="true">
    <strong>Well done!</strong> You successfully read this important alert message.
</joomla-alert>
<joomla-alert level="warning">
    <strong>Warning!</strong> Better check yourself, you're not looking too good.
</joomla-alert>
<joomla-alert level="danger" button="true">
    <strong>Oh snap!</strong> Change a few things up and try submitting again.
</joomla-alert>

## Dismissing
No need for extra javascript, it’s possible to dismiss any alert inline. Here’s how:

Add a  `button="true"`
That's it!!! Now clicking the x button will close the alert!!!

## JavaScript behavior
### Triggers

Enable dismissal of an alert via JavaScript:
```js
element.close()
```

Change the alert type:
```js
element.setAttribute('level', 'warning')
```

Remove or add the close button:
```js
element.setAttribute('button', 'true')
```

## Events
The custom element exposes a few events for hooking into alert functionality.


|Event			|Description								     			|
|-----------------------|-----------------------------------------------------------------------------------------------|
|close.joomla.alert		|This event fires immediately when the close instance method is called.				|
|closed.joomla.alert	|This event is fired when the alert has been closed (will wait for CSS transitions to complete).|


Example:
Add some functonality when the alert is closing (right before the css transition start):
```js
element.addEventListener('close.joomla.alert', function() {alert('Impressed!')} )
```

Add some functonality when the alert is closed (right after the css transition ends):
```js
element.addEventListener('closed.joomla.alert', function() {alert('Very impressive!')} )
```


## Programmatically add a new alert:
Use the following script:


```js
var tempElement = document.createElement('joomla-alert');
tempElement.setAttribute('level', 'success');
tempElement.setAttribute('button', 'true');
tempElement.innerHTML = 'Wow it works!';

document.body.appendChild(tempElement);
```


### Demo

<div id="insert-new-alert"></div>

Run the above command by clicking this button:
<p>
<button role="button" id="insertNew" class="btn btn-success">Create An Alert</button>
</p>

### Programmatically change an alert or add remove the close button:
Use the following script:


```js
var tempElement1 = document.querySelector('joomla-alert');
tempElement1.setAttribute('level', 'success');

tempElement1.setAttribute('button', 'true');
```


### Live example
<joomla-alert id="change-me" level="info" button="true" markdown="0"><strong>Alert:</strong> text goes here</joomla-alert>

<div id="replaceble" markdown="0">
<button role="button" data-opt1="level" value="info">Make it info</button>
<button role="button" data-opt1="level" value="success">Make it success</button>
<button role="button" data-opt1="level" value="warning">Make it warning</button>
<button role="button" data-opt1="level" value="danger">Make it danger</button>
<button role="button" data-opt1="button" value="true">Add close button</button>
<button role="button" data-opt1="button" value="false">Remove close button</button>
</div>




### Programmatically close an alert:
Use the following script:


```js
var tempElement = document.querySelector('joomla-alert');
tempElement.close();
```


### Demo
<joomla-alert id="close-me-with-a-btn" level="danger" button="true">
<strong>Alert:</strong> Close me with javascript
</joomla-alert>
<p>
<button role="button" id="i-will-close-that-alert">Close the above alert</button>
</p>

<script markdown="0">
var addNew = function() {
    var tempElement = document.createElement('joomla-alert');
    tempElement.setAttribute('level', 'success');
    tempElement.setAttribute('button', 'true');
    tempElement.innerHTML = 'Wow it works!';

    document.getElementById('insert-new-alert').appendChild(tempElement);
}

var changeAlert = function(dataAttr, type) {
    var tempElement = document.getElementById('change-me');
    if (dataAttr === 'level')
        tempElement.setAttribute('level', type);
    if (dataAttr === 'button')
        tempElement.setAttribute('button', type);
}
var addNewButton = document.getElementById('insertNew'),
    changeButtons = document.querySelectorAll('#replaceble > button');

addNewButton.addEventListener('click', addNew);
document.getElementById('change-me').addEventListener('close.joomla.alert', function() { alert('Seeing is believing. Event "close.joomla.alert" fired!') });
document.getElementById('change-me').addEventListener('closed.joomla.alert', function() {
    document.getElementById('replaceble').innerHTML = '<h4>Oops the alert has been destroyed. This text was initiated using the event "closed.joomla.alert" (the popup used the event "close.joomla.alert"</h4>';
 });

for (var i = 0, l = changeButtons.length; i < l; i++) {
        changeButtons[i].addEventListener('click', function() { changeAlert(this.getAttribute('data-opt1'), this.value) });
}

document.getElementById('i-will-close-that-alert').addEventListener('click', function(event) { var a = document.getElementById('close-me-with-a-btn');
if (a) a.close(); event.target.setAttribute('disabled', true); event.target.removeEventListener('click', arguments.callee); });
</script>
