<?php
class Maintenance_model extends CI_Model
{
    public function savemaintenance($data)
    {
        $this->db->insert('maintenances', ['vendor_id' => $data['vendor_id'], 'vehicle_id' => $data['vehicle_id'], 'start_date' => $data['start_date'], 'end_date' => $data['end_date'], 'details' => $data['details'], 'cost' => $data['cost'], 'status' => $data['status']]);

        $maintenance_id = $this->db->insert_id();
        foreach ($data['parts'] as $k => $v) {
            $this->db->insert('parts_in_maintenance', ['maintenance_id' => $maintenance_id, 'maintain_date' => $data['end_date'], 'parts_id' => $v, 'qty' => $data['qty'][$k]]);
        }
    }

    public function getvehicle()
    {
        return $this->db->select('id,name')->get('vehicles')->result();
    }
    public function getvendor()
    {
        return $this->db->select('id,name')->get('vendors')->result();
    }
    public function getparts()
    {
        return $this->db->select('id,name')->get('parts')->result();
    }
    public function getmaintenance()
    {
        return $this->db->select('maintenances.*, vehicles.name as vehiclename, vendors.name as vendorname ')
            ->from('maintenances')
            ->join('vehicles', 'vehicles.id=maintenances.vehicle_id')
            ->join('vendors', 'vendors.id=maintenances.vendor_id')
            ->get()->result();
    }
    public function editmaintenance($id)
    {
        return $this->db->select('maintenances.*')->where('id', $id)->get('maintenances')->row();
    }
    public function updaemaintenance($data)
    {
        $this->db->where('id', $data['id'])->update('maintenances', $data);
    }
    public function deletemaintenance($data)
    {
        $this->db->where('id', $data['id'])->delete('maintenances', $data);
    }

    public function saveoil($data)
    {
        $this->db->insert('engine_oil_maintenance', ['vehicle_id' => $data['vehicle_id'], 'oil_change_date' => $data['oildate'], 'status' => $data['status']]);
    }
}
