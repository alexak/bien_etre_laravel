
import { IconButton, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler } from "@material-tailwind/react";
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/facebook';
import 'react-social-icons/twitter';
import 'react-social-icons/whatsapp';
import 'react-social-icons/email';
import { 
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton
} from "react-share";
import config from '@/../../config.json';

export default function SocialmediaShare ({commerce, ...props}) {

    const mail_content = `Salut,
        J'ai trouvé un ${commerce.name}. J'ai pensé que cela pourrait t'intéresser. 
        Jette un œil quand tu as un moment, ça pourrait être sympa pour toi!
        Non seulemet il y a d'autres addresses dans le domaine de la beauté, mais tu as aussi la possibilité d'y prendre rendez-vous.
        Voici le lien  `;

    return (

        <SpeedDial
            placement="right" 
            {...props}
        >
            <SpeedDialHandler>
                <FontAwesomeIcon
                    className="text-gray-400 cursor-pointer hover:text-gray-700"
                    icon={faShareNodes}
                    size="sm"
                />
            </SpeedDialHandler>
            <SpeedDialContent className="flex flex-row text-gray-800">
                <SpeedDialAction>
                    <FacebookShareButton url={route('commerce', commerce.slug) }>        
                        <SocialIcon
                            className=""
                            bgColor="#fff"
                            fgColor="#565656"
                            network="facebook"
                            style={{ height: 25, width: 25 }}
                        />
                    </FacebookShareButton>
                </SpeedDialAction>
                <SpeedDialAction>
                    <TwitterShareButton 
                        url={route('commerce', commerce.slug)}
                        title={commerce.name}
                        hashtags={[`#beaute`, `#${commerce.main_category.title}`]}
                        related={[config.social_media.twitter]}
                    >        
                        <SocialIcon
                            className=""
                            bgColor="#fff"
                            fgColor="#565656"
                            network="twitter"
                            style={{ height: 25, width: 25 }}
                        />
                    </TwitterShareButton>
                </SpeedDialAction>
                <SpeedDialAction>
                    <WhatsappShareButton 
                        url={route('commerce', commerce.slug)}
                        title={commerce.name}
                    >        
                        <SocialIcon
                            className=""
                            bgColor="#fff"
                            fgColor="#565656"
                            network="whatsapp"
                            style={{ height: 25, width: 25 }}
                        />
                    </WhatsappShareButton>
                </SpeedDialAction>
                <SpeedDialAction>
                    <EmailShareButton 
                        url={route('commerce', commerce.slug)}
                        subject="Un coup de cœur à partager avec toi!"
                        body={mail_content}
                    >        
                        <SocialIcon
                            className=""
                            bgColor="#fff"
                            fgColor="#565656"
                            network="email"
                            style={{ height: 25, width: 25 }}
                        />
                    </EmailShareButton>
                </SpeedDialAction>
            </SpeedDialContent>
        </SpeedDial>
    )
}

