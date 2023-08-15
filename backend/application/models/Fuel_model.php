<?php
// class Fuel_model extends CI_Model
// {
    class Fuel_model extends CI_Model
    {
        
    
    
    // public function list()
    // {
    //     return $this->db->get('fuels')->result();
    // }
    //----Fuel-save insert ------

    public function getVehicle()
    {
        return $this->db->select('id,name')->get('vehicles')->result();
    }
    public function getDriver()
    {
        return $this->db->select('id,name')->where('role', 'driver')->get('admin')->result();
    }

    public function getFuel()
    {

        $this->db->select('fuels.*, vehicles.name as vehiclename, admin.name as drivername');
        $this->db->from('fuels');
        $this->db->join('admin', 'admin.id = fuels.driver_id');
        $this->db->join('vehicles', 'vehicles.id = fuels.vehicle_id');
        $this->db->where("admin.role = 'driver'");
        $query = $this->db->get();
        return $query->result();

    }

    public function savefuels($data)
    {
        return $this->db->insert('fuels', $data);
    }
    public function saveexpense($data)
    {
        return $this->db->insert('income_expense', $data);
    }


    //----Fuel--del--------
    public function deletefuel($id)
    {
        $this->db->where('id', $id)->delete('fuels');
    }
    //-------Fuel---edit-------
    public function editfuel($id)
    {
        return $this->db->where('id', $id)->get('fuels')->row();
    }
    //-----Fuel---Update--------
    public function updatefuel($data)
    {
        $this->db->where('id', $data['id'])->update('fuels', $data);
    }


    //---Fuel Report--------date ficker-----

    // public function get_ful($id, $date)
    // {
    //     $this->db->select('fill_date,vehicle_id,driver_id,qty,odometer,amount,remarks');
    //     $this->db->from('fuels');
    //     $this->db->where('vehicle_id', $id);
    //     $this->db->where('date(fill_date)', $date);
    //     $query = $this->db->get()->row();
    //     // return $query->row();



    //     if($query==null){
    //         $meh=0;
    //     }else{
    //         $meh=$query;
    //     }
    //     return $meh;

    // }
 
    //------------report 2-----------

    public function get_ful($id, $date)
    {
        // $this->db->select('fill_date,vehicle_id,driver_id,qty,odometer,amount,remarks');
        $this->db->select('fuels.fill_date,fuels.vehicle_id,fuels.driver_id,fuels.qty,fuels. odometer,fuels.amount,fuels.remarks,vehicles.name as vehiclename, admin.name as drivername');
        $this->db->from('fuels');
        $this->db->join('admin', 'admin.id = fuels.driver_id');
        $this->db->join('vehicles', 'vehicles.id = fuels.vehicle_id');
        $this->db->where("admin.role = 'driver'");
        $this->db->where('vehicle_id', $id);
        $this->db->where('date(fill_date)', $date);
              $query = $this->db->get()->row();
        if($query==null){
            $m=0;
        }else{
            $m=$query;
        }
        return $m;
}


//    //------------Line chart 2-----------
public function get_graph($id, $date)
{
   
    $this->db->select('fuels.fill_date, fuels.vehicle_id, SUM(fuels.qty) as qty, vehicles.name as vehiclename');
    $this->db->from('fuels');
    $this->db->join('vehicles','vehicles.id = fuels.vehicle_id');
    $this->db->where('vehicle_id',$id);
    $this->db->where('date(fuels.fill_date)',$date);
    $query = $this->db->get()->row();
    
    if($query!=null){
        $m=$query;
    }
    return $m;


}


// for check monthly report chart--------

// public function get_graph($id, $date)
// {
// $this->db->select('DATE_FORMAT(fuels.fill_date, "%Y-%m") as month, fuels.vehicle_id, SUM(fuels.qty) as qty, vehicles.name as vehiclename');
// $this->db->from('fuels');
// $this->db->join('vehicles', 'vehicles.id = fuels.vehicle_id');
// $this->db->where('vehicle_id', $id);
// $this->db->where('DATE_FORMAT(fuels.fill_date, "%Y-%m")', $date);
// $this->db->group_by('DATE_FORMAT(fuels.fill_date, "%Y-%m")');
// $query = $this->db->get()->row();
// if($query!=null){
//     $m=$query;
// }
// return $m;

// }


}