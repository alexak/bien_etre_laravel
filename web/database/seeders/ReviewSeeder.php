<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            $comment = $this->getComment();

            DB::table('reviews')->insert([
                'user_id' => 1,
                'commerce_id' => 5,
                'comment' => $comment['text'],
                'rating' => $comment['value'],
                'rating_price' => rand(1, 5),
                'rating_professionalism' => rand(1, 5),
                'rating_cleanliness' => rand(1, 5),
                'rating_kindness' => rand(1, 5),
                'rating_quality' => rand(1, 5),
                'upvoting' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function getComment(){
        $reviews = [
            [
                'value'=>5,
                'text'=>"Incroyable expérience ! Le personnel était accueillant et très professionnel. Je recommande vivement ce lieu à tous ceux qui cherchent un service de qualité supérieure."
            ],[
                'value'=>3,
                'text'=>"Très déçu par la prestation. J'ai attendu plus de 30 minutes avant d'être servi et le résultat n'était pas à la hauteur de mes attentes. Je ne recommande pas."
            ],[
                'value'=>5,
                'text'=>"Service exceptionnel ! Rapide, efficace et à un prix raisonnable. Je reviendrai à coup sûr et je le conseille à mes amis."
            ],[
                'value'=>1,
                'text'=>"Médiocre à tous les niveaux. Le personnel était désagréable et peu serviable, et le service bien en deçà de ce qui avait été promis. Une expérience à ne pas renouveler."
            ],[
                'value'=>5,
                'text'=>"Je suis tellement contente de mon choix ! Le service était impeccable et tout s'est déroulé sans accroc. Un grand merci à toute l'équipe !"
            ],[
                'value'=>3,
                'text'=>"Pas mal, mais peut mieux faire. Le service était correct mais sans plus. Il manquait ce petit quelque chose qui aurait rendu l'expérience mémorable."
            ],[
                'value'=>5,
                'text'=>"Excellent service client ! Les employés sont compétents et très attentifs. Ils ont clairement à cœur la satisfaction de leurs clients."
            ],[
                'value'=>2,
                'text'=>"Service médiocre. La qualité ne justifie pas le prix élevé. Je ne recommanderai pas cet établissement à mon réseau."
            ],[
                'value'=>4,
                'text'=>"Super expérience du début à la fin ! Le personnel était chaleureux et le service rapide. Tout ce qu'on peut désirer d'un bon prestataire."
            ],[
                'value'=>2,
                'text'=>"Service lamentable. Retards, erreurs et aucune excuse de la part du personnel. Il est improbable que je donne une seconde chance à ce fournisseur."
            ]
        ];

        $position = rand(0, count($reviews)-1);

        return $reviews[$position];
    }
}