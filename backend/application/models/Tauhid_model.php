<?php

class Tauhid_model extends CI_Model
{
    public function savebooking($data)
    {
        return $this->db->insert('bookings', $data);
    }
    public function getCustomer()
    {
        return $this->db->select('id,name')->get('customers')->result();
    }
    public function getVehicle()
    {
        // return $this->db->select('id,name')->get('vehicles')->result();

        // $this->db->select('id, name');
        // $this->db->from('vehicles');
        // $this->db->where('NOT EXISTS (SELECT 1 FROM maintenances WHERE maintenances.vehicle_id = vehicles.id)', NULL, FALSE);
        // $query = $this->db->get();
        // return $query->result();

        $this->db->select('id, name');
        $this->db->from('vehicles');
        $this->db->where("NOT EXISTS (SELECT 1 FROM maintenances WHERE maintenances.vehicle_id = vehicles.id AND maintenances.status = 'ongoing')", NULL, FALSE);
        $query = $this->db->get();

        return $query->result();

        // $subquery1 = $this->db->select('vehicle_id')
        //     ->from('maintenances')
        //     ->get_compiled_select();
        // $subquery2 = $this->db->select('vehicle_id')
        //     ->from('bookings')
        //     ->where_in('status', ['completed', 'cancelled'])
        //     ->get_compiled_select();
        // $query = $this->db->select('id, name')
        //     ->from('vehicles')
        //     ->where("vehicles.id NOT IN ($subquery1)", NULL, FALSE)
        //     ->where("vehicles.id IN ($subquery2)", NULL, FALSE)
        //     ->get();
        // return $query->result();
    }
    public function getDriver()
    {
        return $this->db->select('id, name')->where('role', 'driver')->get('admin')->result();

        
    }
    public function getBooking()
    {
        

        return $this->db->select('bookings.*, customers.name AS customername, vehicles.name AS vehiclename')
            ->from('bookings')
            ->join('customers', 'bookings.customer_id=customers.id')
            ->join('vehicles', 'bookings.vehicle_id=vehicles.id')
            ->get()->result();

    }
    public function getExistingBookings()
    {
        $query = $this->db->select('vehicle_id, start_date')
            ->from('bookings')
            ->get();

        return $query->result();
    }
    public function datecheck($vId,$stDate)
    {
        
    }
    public function deletebooking($id)
    {
        $this->db->where('id', $id)->delete('bookings');
    }
    public function editbooking($id)
    {
        return $this->db->where('id', $id)->get('bookings')->row();
    }
    public function updatebooking($data)
    {
        $this->db->where('id', $data['id'])->update('bookings', $data);
    }
    public function getbookingreport($data)
    {

        $this->db->select('bookings.*, admin.name AS drivername, customers.name AS customername, vehicles.name AS vehiclename')
            ->from('bookings')
            ->join('admin', 'admin.id=bookings.driver_id')
            ->join('customers', 'bookings.customer_id=customers.id')
            ->join('vehicles', 'bookings.vehicle_id=vehicles.id')
            ->where("admin.role='driver'")
            ->where('date(start_date)', $data);

        $query = $this->db->get();
        return $query->result();
    }
}


?>