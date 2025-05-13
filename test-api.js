/**
 * API Test Script
 * 
 * Use this script to test the CRUD operations of your API
 * Run with: node test-api.js
 */

const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configuration
const API_URL = `http://localhost:${process.env.PORT || 3000}/api`;
const API_KEY = process.env.API_KEY || 'your-api-key-123456';
const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

// Test item data
const testItem = {
  name: 'Test Item',
  description: 'This is a test item created by the API test script',
  category: 'Other',
  price: 49.99,
  inStock: true,
  quantity: 5
};

// Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Test CRUD operations
async function testApi() {
  let createdItemId;
  
  console.log('🔍 Starting API test...\n');
  
  try {
    // 1. CREATE: Test creating a new item
    console.log('1️⃣ Testing CREATE operation...');
    const createResponse = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers,
      body: JSON.stringify(testItem)
    });
    
    if (!createResponse.ok) {
      throw new Error(`Create failed with status: ${createResponse.status}`);
    }
    
    const createData = await createResponse.json();
    createdItemId = createData.data._id;
    console.log(`✅ Item created with ID: ${createdItemId}`);
    console.log(JSON.stringify(createData.data, null, 2));
    console.log('\n---------------------------------------\n');
    
    // Small delay to ensure changes are processed
    await delay(1000);
    
    // 2. READ: Test getting all items
    console.log('2️⃣ Testing READ ALL operation...');
    const getAllResponse = await fetch(`${API_URL}/items`, {
      method: 'GET',
      headers
    });
    
    if (!getAllResponse.ok) {
      throw new Error(`Get all failed with status: ${getAllResponse.status}`);
    }
    
    const getAllData = await getAllResponse.json();
    console.log(`✅ Retrieved ${getAllData.count} items`);
    console.log(`Total items in database: ${getAllData.total}`);
    console.log('\n---------------------------------------\n');
    
    // 3. READ: Test getting a single item
    console.log(`3️⃣ Testing READ ONE operation for item ID: ${createdItemId}...`);
    const getOneResponse = await fetch(`${API_URL}/items/${createdItemId}`, {
      method: 'GET',
      headers
    });
    
    if (!getOneResponse.ok) {
      throw new Error(`Get one failed with status: ${getOneResponse.status}`);
    }
    
    const getOneData = await getOneResponse.json();
    console.log('✅ Retrieved single item:');
    console.log(JSON.stringify(getOneData.data, null, 2));
    console.log('\n---------------------------------------\n');
    
    // 4. UPDATE: Test updating an item
    console.log(`4️⃣ Testing UPDATE operation for item ID: ${createdItemId}...`);
    const updateResponse = await fetch(`${API_URL}/items/${createdItemId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        name: 'Updated Test Item',
        price: 59.99,
        quantity: 10
      })
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Update failed with status: ${updateResponse.status}`);
    }
    
    const updateData = await updateResponse.json();
    console.log('✅ Item updated:');
    console.log(JSON.stringify(updateData.data, null, 2));
    console.log('\n---------------------------------------\n');
    
    // 5. DELETE: Test deleting an item
    console.log(`5️⃣ Testing DELETE operation for item ID: ${createdItemId}...`);
    const deleteResponse = await fetch(`${API_URL}/items/${createdItemId}`, {
      method: 'DELETE',
      headers
    });
    
    if (!deleteResponse.ok) {
      throw new Error(`Delete failed with status: ${deleteResponse.status}`);
    }
    
    console.log('✅ Item deleted successfully');
    console.log('\n---------------------------------------\n');
    
    // 6. Verify deletion
    console.log(`6️⃣ Verifying item ${createdItemId} was deleted...`);
    const verifyResponse = await fetch(`${API_URL}/items/${createdItemId}`, {
      method: 'GET',
      headers
    });
    
    if (verifyResponse.status === 404) {
      console.log('✅ Verification complete: Item no longer exists (404 Not Found)');
    } else {
      console.log(`⚠️ Expected 404, but got ${verifyResponse.status}`);
    }
    
    console.log('\n---------------------------------------\n');
    console.log('🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Check if the server is running
async function checkServer() {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 3000}/`);
    if (response.ok) {
      console.log('✅ Server is running. Starting tests...\n');
      await testApi();
    } else {
      console.error('❌ Server is running but returned an error status:', response.status);
    }
  } catch (error) {
    console.error('❌ Server is not running. Please start the server before running tests.');
    console.error('   Run: npm run dev');
  }
}

// Start the test
checkServer();
