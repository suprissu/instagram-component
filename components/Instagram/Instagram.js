import "./Instagram.scss";
import { useState, useEffect } from "react";
import Axios from "axios";

const Instagram = ({ username }) => {
	const [profile, setProfile] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		await Axios.get(`https://instagram.com/${username}/?__a=1`)
			.then(({ data }) => {
				console.log(data.graphql.user);
				const user = data.graphql.user;
				const tempProfile = {
					username: user.username,
					nickname: user.full_name,
					photo: user.profile_pic_url,
					bio: user.biography,
					website: user.external_url,
					followers: user.edge_followed_by.count,
					following: user.edge_follow.count,
					posts: user.edge_owner_to_timeline_media.count,
					timeline: {
						feeds: user.edge_owner_to_timeline_media.edges,
					},
				};
				setProfile(tempProfile);
			})
			.catch((e) => {
				setMsg("Failed to fetch data.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	if (isLoading) {
		return (
			<div className="ig">
				<div className="loading">
					<i className="material-icons">replay</i>
				</div>
			</div>
		);
	}
	return (
		<div className="ig">
			<div className="ig__profile">
				<div className="ig__profile__header">
					<h4 className="ig__profile__header__username">{profile.username}</h4>
					<div className="ig__profile__header__content">
						<div className="ig__profile__header__content__image">
							<img src={profile.photo} alt="profile_photo" />
						</div>
						<div className="ig__profile__header__content__right">
							<div className="ig__profile__header__content__right__prestige">
								<div className="ig__profile__header__content__right__prestige__posts">
									<p className="numbers">{profile.posts}</p>
									<p className="text">Posts</p>
								</div>
								<div className="ig__profile__header__content__right__prestige__followers">
									<p className="numbers">{profile.followers}</p>
									<p className="text">Followers</p>
								</div>
								<div className="ig__profile__header__content__right__prestige__following">
									<p className="numbers">{profile.following}</p>
									<p className="text">Following</p>
								</div>
							</div>
							<div className="ig__profile__header__content__right__goto">
								<a href={"https://instagram.com/" + username} target="_blank">
									<button className="primary">Go to profile</button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="ig__profile__description">
					<p className="ig__profile__description__nickname">
						{profile.nickname}
					</p>
					<p className="ig__profile__description__bio">{profile.bio}</p>
					<a
						className="ig__profile__description__web"
						href={profile.website}
						target="_blank"
					>
						{profile.website}
					</a>
				</div>
			</div>
			<div className="ig__timeline">
				<div className="ig__timeline__buttons"></div>
				<div className="ig__timeline__container">
					{profile.timeline != undefined
						? profile.timeline.feeds.map((data, index) => (
								<div className="ig__timeline__container__square" key={index}>
									<img src={data.node.display_url} alt={"feed " + index} />
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default Instagram;
