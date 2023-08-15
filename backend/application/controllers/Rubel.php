<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;
class Rubel extends CI_Controller
{
    public function __construct() {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Rubel_model');
    }
    // public function vehicles()
    // {
    //     $data=$this->Rubel_model->list();
    //     $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    // }
 //---------------vehicle--------------

    public function vehiclesfile()
    {
        $data['type_id']=$this->input->post('type_id');
   
        $data['registration_no']=$this->input->post('registration_no');
        $data['name']=$this->input->post('name');
        $data['model']=$this->input->post('model');
        $data['chesis_no']=$this->input->post('chesis_no');
        $data['manufacturer']=$this->input->post('manufacturer');
        $data['color']=$this->input->post('color');
        $data['expire_date']=$this->input->post('expire_date');
        // $documents=$this->input->post('documents');
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png|pdf';
        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('photo'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['photo'] = $photo['file_name'];
        }
        if ( ! $this->upload->do_upload('documents'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
       
            $documents=$this->upload->data();
            $data['documents'] = $documents['file_name'];
        }
        $this->Rubel_model->savevehicles($data);
        $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
    }
     //-------------ADD--vehicle--------------
    // public function addvehicles()
    // {
    //     $data=json_decode(file_get_contents("php://input"),true);
    //     $header = apache_request_headers();
    //     $token=$header['Authorization'];
    //     // echo "<pre>";
    //     // print_r($data);
    //     // exit;
    //     try{
    //         $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
    //         $d=$this->Rubel_model->savevehicles($data);
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
    //     }catch(ExpiredException $e){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
    //     }catch(SignatureInvalidException $s){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
    //     }catch(Exception $ex){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
    //     }
    // }
    public function gettype()
    {
       $data= $this->Rubel_model->gettype();
        $this->output->set_content_type('application/json')->set_output(json_encode(['title'=> $data,'status'=>true]));
    }
    public function index()
    {
       $data= $this->Rubel_model->gettitle();
        $this->output->set_content_type('application/json')->set_output(json_encode(['type'=> $data,'status'=>true]));
    }
    public function vehicle()
    {
        $data=$this->Rubel_model->data();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

     //------------Del---vehicle--------------
    public function deletevehicle()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Rubel_model->deletevehicle($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully deleted!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
 //-------------Edit--vehicle--------------
    public function editvehicle()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Rubel_model->editvehicle($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    // public function editvehicle()
    // {
    //     $data['type_id']=$this->input->post('type_id');
   
    //     $data['registration_no']=$this->input->post('registration_no');
    //     $data['name']=$this->input->post('name');
    //     $data['model']=$this->input->post('model');
    //     $data['chesis_no']=$this->input->post('chesis_no');
    //     $data['manufacture']=$this->input->post('manufacture');
    //     $data['color']=$this->input->post('color');
    //     $data['expire_date']=$this->input->post('expire_date');
    //     // $documents=$this->input->post('documents');
    //     $config['upload_path']          = './uploads/';
    //     $config['allowed_types']        = 'gif|jpg|png|pdf';
    //     $this->load->library('upload', $config);

    //     if ( ! $this->upload->do_upload('photo'))
    //     {
    //             $error = array('error' => $this->upload->display_errors());
    //             $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
    //     } else{
    //             $photo=$this->upload->data();
    //             $data['photo'] = $photo['file_name'];
    //     }
    //     if ( ! $this->upload->do_upload('documents'))
    //     {
    //             $error = array('error' => $this->upload->display_errors());
    //             $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
    //     } else{
       
    //         $documents=$this->upload->data();
    //         $data['documents'] = $documents['file_name'];
    //     }
    //     $this->Rubel_model->editvehicle($data['id']);
    //     $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
    // }
    // public function updatevehicle()
    // {
        
    //     $header = apache_request_headers();
    //     $token=$header['Authorization'];
    //     try{
    //         $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
    //         // Your section starts here
    //         $data=json_decode(file_get_contents("php://input"),true);
    //         $d=$this->Rubel_model->updatevehicle($data);
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
    //         // Your section ends here
    //     }catch(ExpiredException $e){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
    //     }catch(SignatureInvalidException $s){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
    //     }catch(Exception $ex){
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
    //     }
    // }
  




 //--------Update-------vehicle----1----------

//  public function updatevehicle()
//  {
     
//      $header = apache_request_headers();
//      $token=$header['Authorization'];
//      try{
//          $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
//          // Your section starts here
//          $data=json_decode(file_get_contents("php://input"),true);
//          $d=$this->Rubel_model->updatevehicle($data);
//          $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
//          // Your section ends here
//      }catch(ExpiredException $e){
//          $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
//      }catch(SignatureInvalidException $s){
//          $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
//      }catch(Exception $ex){
//          $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
//      }
//  }

 //--------Update-------vehicle-----2---------
    public function updatevehicle($id)
    {
        $data['id']=$id;
        $data['type_id']=$this->input->post('type_id');
   
        $data['registration_no']=$this->input->post('registration_no');
        $data['name']=$this->input->post('name');
        $data['model']=$this->input->post('model');
        $data['chesis_no']=$this->input->post('chesis_no');
        $data['manufacturer']=$this->input->post('manufacturer');
        $data['color']=$this->input->post('color');
        $data['expire_date']=$this->input->post('expire_date');
        $documents=$this->input->post('documents');

        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png|pdf';
        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('photo'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
                $photo=$this->upload->data();
                $data['photo'] = $photo['file_name'];
        }
        if ( ! $this->upload->do_upload('documents'))
        {
                $error = array('error' => $this->upload->display_errors());
                $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$error, 'status'=>false]));
 
        } else{
       
            $documents=$this->upload->data();
            $data['documents'] = $documents['file_name'];
        }
        // print_r($data);
        // exit;
       $p= $this->Rubel_model->updatevehicle($data);
        $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Updated!','status'=>true,'data'=>$p]));
    }

    //--------------------Vehicle type--------------------
    public function vehicle_type()
    {
        $data=$this->Rubel_model->type();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }


    public function addvehicle_type()
    {
        $data=json_decode(file_get_contents("php://input"),true);
        // $data['password']=md5($data['password']);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Rubel_model->savetype($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    public function deletevehicle_type()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Rubel_model->deletevehicle_type($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully deleted!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    public function editvehicle_type()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Rubel_model->editvehicle_type($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    public function updatevehicle_type()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Rubel_model->updatevehicle_type($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['user'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

}
