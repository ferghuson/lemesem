<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'label'=>'Email',
                'attr'=>['class'=>'form-control-lg']
            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'constraints' => new Length(['min'=>8, 'max'=>'50', 'minMessage'=>'Votre mot de passe contenir au moins 8 caractère.']),
                'first_options' => ['label'=>'Mot de passe', 'attr'=>['class'=>'form-control-lg']],
                'second_options' => ['label'=>'Confirmez le mot de passe', 'attr'=>['class'=>'form-control-lg']],
                'invalid_message' => 'Les deux mot de passe sont incohérents. Veuillez réessayer !',
                'required' => true
            ])
            ->add('submit', SubmitType::class, [
                'label'=>"S'inscrire",
                'attr'=>['class'=>'btn-lg rounded-pill btn-inverse']
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
