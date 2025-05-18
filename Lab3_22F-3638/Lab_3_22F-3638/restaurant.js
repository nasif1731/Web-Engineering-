document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const totalBillInput = document.getElementById('totalBill');
    const tipPercentageInput = document.getElementById('tipPercentage');
    const numPeopleInput = document.getElementById('numPeople');
    const totalBillDisplay = document.getElementById('totalBillDisplay');
    const tipAmountDisplay = document.getElementById('tipAmountDisplay');
    const taxRateDisplay = document.getElementById('taxRateDisplay');
    const totalAmountDisplay = document.getElementById('totalAmountDisplay');
    const amountPerPersonDisplay = document.getElementById('amountPerPersonDisplay');
  
    
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
  
      const totalBill = parseFloat(totalBillInput.value);
      const tipPercentage = parseFloat(tipPercentageInput.value);
      const numPeople = parseInt(numPeopleInput.value);
  
     
      const tipAmount = (totalBill * (tipPercentage / 100)).toFixed(2);
      
      const taxAmount = (totalBill * 0.05).toFixed(2);
      const totalAmount = (totalBill + parseFloat(tipAmount) + parseFloat(taxAmount)).toFixed(2);
      const amountPerPerson = (totalAmount / numPeople).toFixed(2);
      totalBillDisplay.textContent = `$${totalBill.toFixed(2)}`;
      console.log(amountPerPerson);
      tipAmountDisplay.textContent = `$${tipAmount}`;
      taxRateDisplay.textContent = `$${taxAmount}`;
      totalAmountDisplay.textContent = `$${totalAmount}`;
      amountPerPersonDisplay.textContent = `$${amountPerPerson}`;
    });
  
   
    document.getElementById('add_people').addEventListener('click', (event) => {
      event.preventDefault();
      numPeopleInput.value = parseInt(numPeopleInput.value) + 1;
    });
  
    document.getElementById('sub_people').addEventListener('click', (event) => {
      event.preventDefault();
      const currentPeople = parseInt(numPeopleInput.value);
      if (currentPeople > 1) {
        numPeopleInput.value = currentPeople - 1;
      }
    });
  });
  