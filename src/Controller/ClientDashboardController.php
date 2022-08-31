<?php

namespace App\Controller;

use App\Form\ChangePasswordType;
use App\Form\CompleteRegisterType;
use App\Form\UserProfileType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use function Symfony\Component\Mime\from;

class ClientDashboardController extends AbstractController
{
    private $entityManager, $alert = null, $alertMessage = null;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/client/tableau-de-bord', name: 'app_client_dashboard')]
    public function index(): Response
    {
        if (isset($_GET['register'])){
            $this->alert = 'success';
            $this->alertMessage = 'Félicitation... votre inscription est maintenant complète.';
        }

        return $this->render('client_dashboard/index.html.twig', [
            'alert' => $this->alert,
            'alert_message' => $this->alertMessage
        ]);
    }

    #[Route('/client/finalisation-inscription', name: 'app_client_complete')]
    public function completeRegister(Request $request): Response
    {
        if (isset($_GET['register'])){
            $this->alert = 'success';
            $this->alertMessage = 'Félicitation... votre compte a été avec succès. Veuillez finaliser votre inscription en remplissant le formulaire sous-dessous.';
        }

        $user = $this->getUser();
        $form = $this->createForm(CompleteRegisterType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            $user = $form->getData();

            $this->entityManager->persist($user);
            $this->entityManager->flush();


            return $this->redirectToRoute('app_client_dashboard', ['register' => 'complete']);
        }

        return $this->render('client_dashboard/complete-register.html.twig', [
            'complete_form' => $form->createView(),
            'alert' => $this->alert,
            'alert_message' => $this->alertMessage
        ]);
    }

    #[Route('/client/mon-profil', name: 'app_client_profile')]
    public function editProfile(Request $request): Response
    {
        $alert = null; $alertMessage = null;
        $user = $this->getUser();
        $form = $this->createForm(UserProfileType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            $user = $form->getData();

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $this->alert = 'success';
            $this->alertMessage = 'Votre profil a été mis à jour avec succès.';
        }

        return $this->render('client_dashboard/profile.html.twig', [
            'profile_form' => $form->createView(),
            'alert' => $this->alert,
            'alert_message' => $this->alertMessage
        ]);
    }

    #[Route('/client/changer-mot-de-passe', name: 'app_client_password')]
    public function newPassword(Request $request, UserPasswordHasherInterface $hasher): Response
    {
        $alert = null; $alertMessage = null;
        $user = $this->getUser();
        $form = $this->createForm(ChangePasswordType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){

            $old_pwd = $form->get('old_password')->getData();

            if($hasher->isPasswordValid($user, $old_pwd)){

                $new_pwd = $form->get('new_password')->getData();

                $user->setPassword($hasher->hashPassword($user, $new_pwd));

                $this->entityManager->flush();

                $this->alert = 'success';
                $this->alertMessage = 'Votre mot de passe a bien été mis à jour.';
            }else{
                $this->alert = 'danger';
                $this->alertMessage = "Votre mot de actuel est incorrect. Veuillez réessayer.";
            }

        }

        return $this->render('client_dashboard/password.html.twig', [
            'pwd_form' => $form->createView(),
            'alert' => $this->alert,
            'alert_message' => $this->alertMessage
        ]);
    }
}
