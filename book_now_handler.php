<?php
// Include database connection
require_once 'db_connection.php';

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $full_name = $conn->real_escape_string($_POST['full_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $event_type = $conn->real_escape_string($_POST['event_type']);
    $event_date = $conn->real_escape_string($_POST['event_date']);
    $guest_count = intval($_POST['guest_count']);
    $additional_details = $conn->real_escape_string($_POST['additional_details']);

    // Validate inputs
    $errors = [];
    if (empty($full_name)) $errors[] = "Full name is required";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($phone)) $errors[] = "Phone number is required";
    if (empty($event_type)) $errors[] = "Event type is required";
    if (empty($event_date)) $errors[] = "Event date is required";
    if ($guest_count <= 0) $errors[] = "Invalid guest count";

    // If no errors, insert into database
    if (empty($errors)) {
        $sql = "INSERT INTO booking_requests (full_name, email, phone, event_type, event_date, guest_count, additional_details) 
                VALUES ('$full_name', '$email', '$phone', '$event_type', '$event_date', $guest_count, '$additional_details')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['status' => 'success', 'message' => 'Booking request submitted successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . $conn->error]);
        }
    } else {
        echo json_encode(['status' => 'error', 'errors' => $errors]);
    }

    // Close connection
    $conn->close();
    exit();
}
?>